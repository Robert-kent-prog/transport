// controllers/authController.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export const loginUser = async (req, res) => {
    try {
        // console.log("Received request body:", req.body);

        // Accept `identifier` or directly `email` or `phone`
        const identifier = req.body.identifier || req.body.email || req.body.phone;
        const password = req.body.password;

        if (!identifier || !password) {
            // console.log("Missing identifier or password");
            return res.status(400).json({ error: 'Identifier and password are required.' });
        }

        // console.log("Searching for user with identifier:", identifier);

        const user = await User.findOne({
            $or: [
                { name: identifier },
                { email: identifier },
                { phone: identifier },
            ],
        }).select('+password');

        if (!user) {
            // console.log("User not found for identifier:", identifier);
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // console.log("User found:", user);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // console.log("Password does not match for user:", user.email);
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // console.log("Password matched, generating token...");

        const ACCESS_KEY = process.env.JWT_SECRET;
        // console.log("JWT_SECRET in loginUser:", process.env.JWT_SECRET);

        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role,
                iss: "https://secure.rideshare.com"
            },
            ACCESS_KEY,
            { expiresIn: '2d' }
        );

        user.AccessToken = accessToken;
        await user.save();

        // const { password: _, ...userData } = user.toObject();

        res.status(200).json({ AccessToken: accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};

