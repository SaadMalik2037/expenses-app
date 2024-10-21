const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        const { email, name, mobile } = req.body;
        const newUser = new User({ email, name, mobile });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
