import express from 'express';
import { pool } from './database/db_connection.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

const port = 3000;

// Haversine Formula to calculate distance between two geographical points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};

app.get('/', (req, res) => {
    res.send('It\'s running');
});

// Route to add a school
app.post('/addSchool', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        // Insert into the database
        const [data] = await pool.query(
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

// Route to list all schools, sorted by proximity
app.get('/listSchools', async (req, res) => {
    try {
        const { latitude, longitude } = req.query; // Get user location from query parameters

        if (!latitude || !longitude) {
            return res.status(400).json({ success: false, message: 'Latitude and Longitude are required' });
        }

        // Fetch all schools from the database
        const [schools] = await pool.query('SELECT * FROM schools;');

        // Calculate distances and sort by proximity
        const sortedSchools = schools.map(school => {
            const distance = calculateDistance(
                parseFloat(latitude), parseFloat(longitude),
                parseFloat(school.latitude), parseFloat(school.longitude)
            );
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance); // Sort by distance (ascending)

        // Send response with sorted schools
        res.status(200).json({ success: true, data: sortedSchools });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
