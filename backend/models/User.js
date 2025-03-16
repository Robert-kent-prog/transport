// models/User.js

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        userId: { type: String, required: false }, // Optional unique identifier
        name: { type: String, required: true }, // First name (required)
        phone: { type: String, required: true, unique: true }, // Phone number (unique and required)
        email: { type: String, required: true, unique: true }, // Email (unique and required)
        password: { type: String, required: true }, // Password (required)
        role: {
            type: String,
            enum: ['driver', 'passenger'], // Role can be "driver" or "passenger"
            default: 'passenger', // Default role is "passenger"
        },
        carDetails: {
            make: {
                type: String,
                required: function () {
                    return this.role === 'driver'; // Required only if role is "driver"
                },
            },
            model: {
                type: String,
                required: function () {
                    return this.role === 'driver'; // Required only if role is "driver"
                },
            },
            licensePlate: {
                type: String,
                required: function () {
                    return this.role === 'driver'; // Required only if role is "driver"
                },
            },
            seatingCapacity: {
                type: Number,
                required: function () {
                    return this.role === 'driver'; // Required only if role is "driver"
                },
                min: 1, // Minimum value for seating capacity
            },
        },
        AccessToken: {
            type: String,
            required: false, // Optional access token field
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const User = mongoose.model('User', userSchema);

export default User;