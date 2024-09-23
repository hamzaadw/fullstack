const express = require('express');
const cors = require('cors');
const app = express();
const router = require('../routes/router.js');
require('dotenv').config();

// Enable CORS for both local development and production (on Vercel)
const allowedOrigins = [
    'http://localhost:3000', // Local React dev
    'https://your-vercel-frontend-url.vercel.app' // Add your Vercel frontend URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use your custom router
app.use('/', router);

// Root route for basic checks
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server on the assigned port, or default to 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
