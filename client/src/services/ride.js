// src/services/ride.js

import axios from 'axios';

export const searchRides = async (filters) => {
    const response = await axios.get('/api/rides', { params: filters });
    return response.data;
};

export const confirmBooking = async (rideId) => {
    await axios.post(`/api/bookings`, { rideId });
};