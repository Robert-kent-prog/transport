// controllers/rideController.js

import Ride from '../models/Ride.js';
import User from '../models/User.js';

export const createRide = async (req, res) => {
    try {
        const { pickupLocation, dropoffLocation, departureTime, arrivalTime, availableSeats } = req.body;
        const userId = req.user.id; // Authenticated user ID from middleware

        // Ensure the user is a driver
        const driver = await User.findById(userId).select('role'); // Fetch only the role field
        if (!driver || driver.role !== 'driver') {
            return res.status(403).json({ error: 'Only drivers can create rides.' });
        }

        // Create the ride without car details
        const newRide = new Ride({
            driver: userId,
            pickupLocation,
            dropoffLocation,
            departureTime: new Date(departureTime),
            arrivalTime: new Date(arrivalTime),
            availableSeats: parseInt(availableSeats, 10),
        });

        await newRide.save();

        // Populate car details dynamically when retrieving the ride
        const savedRide = await Ride.findById(newRide._id)
            .populate('driver', 'name role carDetails') // Include driver's name, role, and car details
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