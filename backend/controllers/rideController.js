import Ride from '../models/Ride.js';
import User from '../models/User.js';

// Function to create a new ride
export const createRide = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unauthorized. User not found in request.' });
        }

        const { pickupLocation, dropoffLocation, departureTime, arrivalTime, availableSeats } = req.body;
        const userId = req.user.userId; // Extract userId from token

        if (!userId) {
            return res.status(400).json({ error: 'Invalid request. UserId is missing.' });
        }

        const driver = await User.findById(userId);
        if (!driver) {
            return res.status(404).json({ error: 'Driver not found' });
        }

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
        const rides = await Ride.find()
            .populate('driver', 'name role carDetails') // Include driver's name, role, and car details
            .exec();

        res.status(200).json(rides);
    } catch (error) {
        console.error('Error fetching rides:', error);
        res.status(500).json({ error: error.message });
    }
};

// Function to update the status of a ride by ID
export const updateRideDetails = async (req, res) => {
    try {
        const { rideId } = req.params; // Extract rideId from URL params
        const { status, availableSeats } = req.body; // Extract updated fields from request body
        const userId = req.user.userId; // Extract userId from the JWT token

        // Find the ride by ID
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        // Use the driverId stored in the ride data for verification
        if (ride.driver.toString() !== userId) {
            return res.status(403).json({ error: 'Forbidden. Only the driver who created the ride can update it.' });
        }

        // Update the ride details
        ride.status = status;
        ride.availableSeats = availableSeats;
        await ride.save();

        res.status(200).json({ message: 'Ride details updated successfully', ride });
    } catch (error) {
        console.error('Error updating ride details:', error);
        res.status(500).json({ error: error.message });
    }
};

// Function to delete a ride by ID
export const deleteRide = async (req, res) => {
    try {
        const { rideId } = req.params; // Extract rideId from URL params
        const userId = req.user.userId; // Extract userId from token

        // Find the ride by ID
        const ride = await Ride.findById(rideId);
        if (!ride) {
            return res.status(404).json({ error: 'Ride not found' });
        }

        // Ensure only the driver who created the ride can delete it
        if (ride.driver.toString() !== userId) {
            return res.status(403).json({ error: 'Forbidden. Only the driver who created the ride can delete it.' });
        }

        // Delete the ride
        await Ride.findByIdAndDelete(rideId);

        res.status(200).json({ message: 'Ride deleted successfully' });
    } catch (error) {
        console.error('Error deleting ride:', error);
        res.status(500).json({ error: error.message });
    }
};