// routes/rideRoutes.js

import express from 'express';
import { createRide, getAllRides, updateRideDetails, deleteRide } from '../controllers/rideController.js';
import { verifyDriver } from '../middleware/verifyDriver.js';
import { verifyJWT } from '../middleware/verifyJWT.js';

const router = express.Router();

// Protect all routes with authentication
// router.use(authenticate);

// Create a ride
router.post('/create', verifyDriver, verifyJWT, createRide);

// Get all rides
router.get('/all', verifyJWT, getAllRides);

// Create a ride
router.put('/update/:rideId', verifyDriver, verifyJWT, updateRideDetails);
// Create a ride
router.delete('/delete/:rideId', verifyDriver, verifyJWT, deleteRide);

export default router;