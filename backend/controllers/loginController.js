import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const loginUser = async (req, res) => {
    try {
        const identifier = req.body.identifier || req.body.email || req.body.phone;
        const password = req.body.password;

        if (!identifier || !password) {
            return res.status(400).json({ error: 'Identifier and password are required.' });
        }

        // console.log("Searching for user with identifier:", identifier);

        const user = await User.findOne({
            $or: [{ name: identifier }, { email: identifier }, { phone: identifier }],
        }).select('+password'); // Ensure password is selected

        if (!user) {
            // console.log("User not found for identifier:", identifier);
            return res.status(401).json({ error: 'Invalid credentials.' }); // Change to 401
        }

        // console.log("User found:", user.email);

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // console.log("Incorrect password for:", user.email);
            return res.status(401).json({ error: 'Invalid credentials.' }); // Change to 401
        }

        const ACCESS_KEY = process.env.JWT_SECRET;
        if (!ACCESS_KEY) {
            // console.error("JWT_SECRET is missing in environment variables.");
            return res.status(500).json({ error: 'Internal server error.' });
        }

        const accessToken = jwt.sign(
            { userId: user._id, role: user.role, iss: "https://secure.rideshare.com" },
            ACCESS_KEY,
            { expiresIn: '2d' }
        );

        // console.log("Generated token for:", user.email);

        user.AccessToken = accessToken;
        await user.save();

        res.status(200).json({ AccessToken: accessToken });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
