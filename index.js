var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "Welcome to Github-action CI/CD via ansible " }');
});

app.get('/will', function (req, res) {
    res.send('{ "response": "Welcome" }');
});

app.get('/ready', function (req, res) {
    res.send('{ "response": " Great!, It works!" }');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
