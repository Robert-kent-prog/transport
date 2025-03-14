// src/services/auth.js

import axios from 'axios';

const API_URL = 'https://your-backend-api.com/api';

// Login function
export const login = async (credentials) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

// Logout function
export const logout = async () => {
    await axios.post(`${API_URL}/auth/logout`);
};

// Get user data
export const getUser = async () => {
    const response = await axios.get(`${API_URL}/auth/user`);
    return response.data;
};