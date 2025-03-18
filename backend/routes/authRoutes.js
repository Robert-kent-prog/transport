import express from 'express';
import {
    getUsers,
    getUser,
    registerUser,
    updateUser,
    deleteUser
} from '../controllers/authController.js';

const router = express.Router();

// Route to fetch all users
router.get('/users', getUsers);

// Route to fetch a user by ID
router.get('/users/:id', getUser);

// Route to register a new user
router.post('/register', registerUser);

// Route to update an existing user by ID
router.put('/users/:id', updateUser);

// Route to delete a user by ID
router.delete('/users/:id', deleteUser);

export default router;