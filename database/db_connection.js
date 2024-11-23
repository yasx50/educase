import mysql from 'mysql2'
import  dotenv  from 'dotenv'

dotenv.config()



export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DATABASE,
    port: process.env.DB_PORT,
}).promise()



// process.env.DB_HOST
// process.env.DB_USER
// process.env.DB_PASSWORD
// process.env.DATABASE

