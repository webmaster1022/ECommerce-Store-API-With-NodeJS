import client from "../database";


export type Order = {
    id?:number;
    status:string;
    user_id:number;
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
            const sql = `INSERT INTO orders (status,user_id) VALUES($1,$2) RETURNING *`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[o.status,o.user_id]); //store results from sql query
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
            const sql = `DELETE FROM orders WHERE id=($1)`;//SQL command to retrieve data from database table
            const result = await conn.query(sql,[id]); //store results from sql query
            conn.release(); //close database connection
            return result.rows[0];
        } catch (error) {
            throw new Error(`Cannot delete order with id:${id} ${error}`)
        }
    }

    async addProduct(quantity:number,orderId:string,productId:string):Promise<Order> {
        try {
            const sql = 'INSERT INTO order_products(quantity,order_id,product_id) VALUES($1,$2,$3)';
            const conn = await client.connect();
            const result = await conn.query(sql,[quantity,orderId,productId]);
            const order = result.rows[0];
            conn.release();
            return order
        } catch (error) {
            throw new Error(`Could not add product ${productId} to order ${orderId}: ${error}`)
        }
    }

    async orderProperty(id:number):Promise<Order>{
        try {
            const sql = 'SELECT * FROM orders WHERE user_id=($1)';
        const conn = await client.connect();
        const result = await conn.query(sql,[id]);
        const order = result.rows[0];
        conn.release();
        return order
        } catch (error) {
            throw new Error(`Cannot retrieve order with user_id:${id} ${error}`)
        }
    }
}