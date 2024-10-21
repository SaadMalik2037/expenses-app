const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

// Define a root route
app.get('/', (req, res) => {
    res.send('Welcome to the Daily Expenses Sharing Application!');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => console.error('Error connecting to MongoDB:', error));
