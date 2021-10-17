import client from "../database";
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();


const {
    BCRYPT_PASSOWRD,
    SALT_ROUNDS,
    
}=process.env;

export type User = {
    id?:number;
    username:string,
    first_name:string;
    last_name:string;
    password:string,
    
}
const pepper=BCRYPT_PASSOWRD;

export class userStore{
    async index(): Promise<User[]> {
       try {
        const conn = await client.connect(); //connectos to database
        const sql = 'SELECT * FROM users';//SQL command to retrieve data from database table
        const result = await conn.query(sql); //store results from sql query
        conn.release(); //close database connection
        return result.rows;
       } catch (error) {
           throw new Error (`Cannot retrieve users ${error}`)
       }
    }

    async show(id:string):Promise<User> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `SELECT * FROM users WHERE id=($1)`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[id]); //store results from sql query
            conn.release(); //close database connection
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot retrieve user with id:${id} ${error}`)
        }
    }

    async create(u:User):Promise<User> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `INSERT INTO users (first_name,last_name,username,password_digest) VALUES($1,$2,$3,$4) RETURNING *`;//SQL command to retrieve data from database table
            
            const salt_rounds=(SALT_ROUNDS) as string;
            const hash = bcrypt.hashSync(u.password+pepper,parseInt(salt_rounds))
            
            const result = await conn.query(sql,[u.first_name,u.last_name,u.username,hash]); //store results from sql query
            conn.release(); //close database connection
            const user = result.rows[0];
            return user;
        } catch (error) {
            throw new Error(`Cannot create user ${u} ${error}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await client.connect()
  
      const result = await conn.query(sql, [id])
  
      const user = result.rows[0]
  
      conn.release()
  
      return user
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async authenticate(username:string,password:string):Promise<User|null> {
        const conn = await client.connect(); //connectos to database
        const sql = 'SELECT password_digest FROM users WHERE username=($1)'
        const result = await conn.query(sql,[username]);
        if(result.rows.length){
            const user = result.rows[0];
            console.log(user);
            if(bcrypt.compareSync(password+pepper,user.password_digest)){
                return user 
            }
        }
        return null;
    }
}