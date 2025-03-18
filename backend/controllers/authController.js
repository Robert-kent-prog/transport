import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Controller to fetch all users
export const getUsers = async (req, res) => {
    try {
        // Fetch all users directly from the database
        const users = await User.find().select('-password'); // Exclude passwords for security

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to fetch a user by ID
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID directly from the database
        const user = await User.findById(userId).select('-password'); // Exclude password for security

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to register a new user
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

// Controller to update an existing user
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, email, phone, password, confirmPassword, role, carDetails } = req.body;

        // Validate input
        if (password && password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Find the user by ID
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if email is being updated and if it's already taken
        if (email && email !== existingUser.email) {
            const emailExists = await User.findOne({ email });
            if (emailExists) {
                return res.status(400).json({ error: 'Email already exists' });
            }
        }

        // Update fields
        if (name) existingUser.name = name;
        if (email) existingUser.email = email;
        if (phone) existingUser.phone = phone;
        if (role) existingUser.role = role;
        if (carDetails && role === 'driver') existingUser.carDetails = carDetails;

        // Hash the new password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            existingUser.password = hashedPassword;
        }

        // Save the updated user
        await existingUser.save();

        res.status(200).json({ message: 'User updated successfully', user: existingUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller to delete a user by ID
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        // Delete the user directly from the database
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};