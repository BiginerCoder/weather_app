require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();

// Load API Key from .env
const API_KEY = process.env.API_KEY;
console.log(API_KEY);

app.use(express.static(path.join(__dirname, "/public"))); // Serve static files
app.set('view engine', 'ejs'); // Set view engine
app.set('views', path.join(__dirname, 'views')); // Set views directory

// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/weather_app', (req, res) => {
    res.render("main/index", { apiKey: process.env.API_KEY }); 
});
app.get('/api/key', (req, res) => {
    res.json({ apiKey: process.env.API_KEY });
});
// Start Server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

