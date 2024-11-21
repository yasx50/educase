import express from 'express'
import {pool} from './database/db_connection.js'
import morgan from 'morgan'

const app = express()
app.use(morgan())
app.use(express.json({limit:'16kb'}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))

const port = 4000

app.get('/',(req,res)=>{
    res.send('its running')
})

app.post('/add', async (req, res) => {
    try {
        let { name, address, latitude, longitude } = req.body;

        // Insert into the database
        const data = await pool.query(
            `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`,
            [name, address, latitude, longitude]
        );

        // Send success response
        res.status(201).json({ success: true, message: 'Data inserted successfully', data });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
});


app.listen(port,()=>{
    console.log('server is running !!!');
    
})

