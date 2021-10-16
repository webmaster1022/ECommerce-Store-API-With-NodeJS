import dotenv from 'dotenv';
import { Pool } from 'pg';





const {
    POSTGRES_HOST,
    POSTGRES_DB_DEV,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_DB_TEST,
    ENV
}=process.env;

const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_DEV,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})

export default client