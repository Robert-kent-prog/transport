// controllers/rideController.js

import Ride from '../models/Ride.js';
import User from '../models/User.js';

export const createRide = async (req, res) => {
    try {
        // console.log('User from req:', req.user); // Debugging

        if (!req.user) {
            // console.error('Unauthorized: No user found in request');
            return res.status(401).json({ error: 'Unauthorized. User not found in request.' });
        }

        const { pickupLocation, dropoffLocation, departureTime, arrivalTime, availableSeats } = req.body;
        const userId = req.user.userId; // Extract userId from token

        // console.log('Extracted userId:', userId); // Debugging

        if (!userId) {
            // console.error('Error: userId is undefined');
            return res.status(400).json({ error: 'Invalid request. UserId is missing.' });
        }

        // Ensure the user exists in the database
        const driver = await User.findById(userId);
        if (!driver) {
            // console.error('Error: Driver not found in the database');
            return res.status(404).json({ error: 'Driver not found' });
        }

        // console.log('Driver found:', driver); // Debugging

        // Create a new ride
        const newRide = new Ride({
            driver: userId,  // Make sure driver is assigned correctly
            pickupLocation,
            dropoffLocation,
            departureTime: new Date(departureTime),
            arrivalTime: new Date(arrivalTime),
            availableSeats: parseInt(availableSeats, 10),
        });

        // console.log('New Ride Object:', newRide); // Debugging

        await newRide.save();
        const savedRide = await Ride.findById(newRide._id)
            .populate('driver', 'name role carDetails')
            .exec();

        // console.log('Ride saved successfully:', savedRide); // Debugging

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