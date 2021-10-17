import client from "../database";


export type Product = {
    id?:number;
    name:string;
    price:number;
    cathegory:string
}

export class productStore{
    async index(): Promise<Product[]> {
       try {
        const conn = await client.connect(); //connectos to database
        const sql = 'SELECT * FROM products';//SQL command to retrieve data from database table
        const result = await conn.query(sql); //store results from sql query
        conn.release(); //close database connection
        return result.rows;
       } catch (error) {
           throw new Error (`Cannot retrieve prodructs ${error}`)
       }
    }

    async show(id:string):Promise<Product> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `SELECT * FROM products WHERE id=($1)`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[id]); //store results from sql query
            conn.release(); //close database connection
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot retrieve product with id:${id} ${error}`)
        }
    }

    async create(p:Product):Promise<Product> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `INSERT INTO products (name,price,cathegory) VALUES($1,$2,$3) RETURNING *`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[p.name,p.price,p.cathegory]); //store results from sql query
            conn.release(); //close database connection
            const product = result.rows[0];
            return product;
        } catch (error) {
            throw new Error(`Cannot create product ${p} ${error}`)
        }
    }

    async delete(id:string):Promise<Product> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `DELETE FROM products WHERE id=($1)`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[id]); //store results from sql query
            conn.release(); //close database connection
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot retrieve product with id:${id} ${error}`)
        }
    }
}