// index.js
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Create MySQL pool (Cloud SQL)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000 // 10 seconds
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
        console.error("DB ERROR:", error.message);
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
        console.error("DB READY CHECK FAILED:", err.message);
        res.status(500).json({ status: "Database Not Ready" });
    }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
