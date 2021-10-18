import dotenv from 'dotenv';
import { Pool, PoolClient } from 'pg';


dotenv.config();



const {
    POSTGRES_HOST,
    POSTGRES_DB_DEV,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    ENV
    
}=process.env;

let client:Pool = new Pool();

if(ENV==='test'){
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
}
if(ENV==='dev'){
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_DEV,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    })
    
}

export default client;

