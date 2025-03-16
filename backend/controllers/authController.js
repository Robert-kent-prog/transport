// controllers/authController.js

import bcrypt from 'bcryptjs';
// import jwt from '../utils/jwt.js';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, confirmPassword, role, carDetails } = req.body;

        // Validate input
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
            ...(role === 'driver' && { carDetails }), // Include carDetails only for drivers
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};