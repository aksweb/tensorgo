const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./models/dbConnect');
const authRoutes = require('./routes/authRoutes');
const PORT = process.env.PORT || 8080;

// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // Allow the frontend origin
    credentials: true, // Allow credentials to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
}));
app.use('/', authRoutes); // <- NEW LINE


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})