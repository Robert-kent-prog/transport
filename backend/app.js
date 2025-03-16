// app.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB using async/await and without deprecated options
try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log('MongoDB Connected');
} catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit the application if connection fails
}

export default app;