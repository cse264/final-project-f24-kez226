const express = require('express');
const cors = require('cors'); // Import cors package
const connectDB = require('./db');
const userRoutes = require('./routes/users');
const watchListRoutes = require('./routes/watchList');
const reviewRoutes = require('./routes/review');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend (React app running on port 3001)
const corsOptions = {
    origin: 'http://localhost:3001', // Allow frontend running on localhost:3001 to access the API
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/watchlist', watchListRoutes);
app.use('/api/reviews', reviewRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
