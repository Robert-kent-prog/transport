// src/services/api.js

import axios from 'axios';

const API_URL = 'https://your-backend-api.com/api';

export const getRides = async () => {
    const response = await axios.get(`${API_URL}/rides`);
    return response.data;
};

export const createRide = async (rideData) => {
    const response = await axios.post(`${API_URL}/rides`, rideData);
    return response.data;
};