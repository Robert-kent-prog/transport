// models/Ride.js

import mongoose from 'mongoose';

const rideSchema = new mongoose.Schema(
    {
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model (driver)
            required: true,
        },
        pickupLocation: {
            type: String,
            required: true,
        },
        dropoffLocation: {
            type: String,
            required: true,
        },
        departureTime: {
            type: Date,
            required: true,
        },
        arrivalTime: {
            type: Date,
            required: true,
        },
        availableSeats: {
            type: Number,
            required: true,
            min: 1,
        },
        ridePrice: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'cancelled'], // Status of the ride
            default: 'active',
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

export default mongoose.model('Ride', rideSchema);