// controllers/rideController.js

import Ride from '../models/Ride.js';
import User from '../models/User.js';

export const createRide = async (req, res) => {
    try {
        console.log('User from req:', req.user); // Debugging

        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized. User not found in request.' });
        }

        const { pickupLocation, dropoffLocation, departureTime, arrivalTime, availableSeats } = req.body;
        const userId = req.user._id;

        const newRide = new Ride({
            driver: userId,
            pickupLocation,
            dropoffLocation,
            departureTime: new Date(departureTime),
            arrivalTime: new Date(arrivalTime),
            availableSeats: parseInt(availableSeats, 10),
        });

        await newRide.save();
        const savedRide = await Ride.findById(newRide._id)
            .populate('driver', 'name role carDetails')
            .exec();

        res.status(201).json({ message: 'Ride created successfully', ride: savedRide });
    } catch (error) {
        console.error('Error creating ride:', error);
        res.status(500).json({ error: error.message });
    }
};

// Function to fetch all rides
export const getAllRides = async (req, res) => {
    try {
        // Fetch all rides and populate driver details
        const rides = await Ride.find()
            .populate('driver', 'name role carDetails') // Include driver's name, role, and car details
            .exec();

        res.status(200).json(rides);
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).json({ error: error.message });
    }
};