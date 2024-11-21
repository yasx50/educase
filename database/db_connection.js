import mysql from 'mysql2'
import  dotenv  from 'dotenv'

dotenv.config()


export const pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'yash8055',
    database:'educase',
    port:3307
}).promise()



// process.env.DB_HOST
// process.env.DB_USER
// process.env.DB_PASSWORD
// process.env.DATABASE

