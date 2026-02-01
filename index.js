// index.js
const express = require('express');
const app = express();

// Root endpoint
app.get('/', (req, res) => {
    res.json({ response: "Welcome to Github-action CI/CD via ansible" });
});

// /will endpoint
app.get('/will', (req, res) => {
    res.json({ response: "Welcome" });
});

// /ready endpoint
app.get('/ready', (req, res) => {
    res.json({ response: "Great!, It works!" });
});

// Use PORT from environment or default 8080
const PORT = process.env.PORT || 8080;

// Bind to 0.0.0.0 to expose outside container
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
