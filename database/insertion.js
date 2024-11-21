import  {pool}  from "./db_connection.js";

async function insertInDb(name,address,latitude,longitude) {

    const data = await pool.query(`insert into schools(name,address,latitude,longitude) values(?,?,?,?)`,[name,address,latitude,longitude])
    return data
}

const result = await insertInDb('test','w',2.0,3.0);
console.log(result);
