// index.js
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Create MySQL pool
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'testdb',
    waitForConnections: true,
    connectionLimit: 10
});

// Root endpoint
app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT NOW() as time');
        res.json({ 
            message: "deploy service with docker compose",
            db_time: rows[0].time
        });
    } catch (error) {
        res.status(500).json({ error: "Database not connected" });
    }
});

app.get('/will', (req, res) => {
    res.json({ response: "Welcome" });
});

app.get('/ready', async (req, res) => {
    try {
        await pool.query('SELECT 1');
        res.json({ status: "Database Ready" });
    } catch (err) {
        res.status(500).json({ status: "Database Not Ready" });
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
