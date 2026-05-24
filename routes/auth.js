const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ─── POST: Register a New User ────────────────────────────────────────────────
router.post('/register', async (req, res) => {
    try {
        // In a production app, you MUST hash the password (e.g., using bcrypt). 
        // For this mini-project, we are keeping it straightforward to hit the deadline.
        const { name, email, password, role } = req.body;

        const newUser = new User({ name, email, password, role });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error: error.message });
    }
});

// ─── POST: Login User ─────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Send back the user details (especially their role and ID)
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

module.exports = router;