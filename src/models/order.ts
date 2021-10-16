import client from "../database";


export type Order = {
    id?:number;
    product_id:number;
    quantity:number;
    user_id:number;
    status:string;
}


/* id
id of each product in the order
quantity of each product in the order
user_id
status of order (active or complete) */

export class orderStore{
    async index(): Promise<Order[]> {
       try {
        const conn = await client.connect(); //connectos to database
        const sql = 'SELECT * FROM orders';//SQL command to retrieve data from database table
        const result = await conn.query(sql); //store results from sql query
        conn.release(); //close database connection
        return result.rows;
       } catch (error) {
           throw new Error (`Cannot retrieve orders ${error}`)
       }
    }

    async show(id:string):Promise<Order> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `SELECT * FROM orders WHERE id=($1)`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[id]); //store results from sql query
            conn.release(); //close database connection
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot retrieve order with id:${id} ${error}`)
        }
    }

    async create(o:Order):Promise<Order> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `INSERT INTO orders (product_id,quantity,user_id,status) VALUES($1,$2,$3,$4) RETURNING *`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[o.product_id,o.quantity,o.user_id,o.status]); //store results from sql query
            conn.release(); //close database connection
            const order = result.rows[0];
            return order;
        } catch (error) {
            throw new Error(`Cannot create order ${o} ${error}`)
        }
    }

    async delete(id:string):Promise<Order> {
        try {
            const conn = await client.connect(); //connectos to database
            const sql = `DELETE * FROM orders WHERE id=($1)`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[id]); //store results from sql query
            conn.release(); //close database connection
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete product with id:${id} ${error}`)
        }
    }
}