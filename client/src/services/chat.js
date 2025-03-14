// src/services/chat.js

import axios from 'axios';

export const sendMessage = async (driverId, message) => {
    await axios.post(`/api/chats/${driverId}`, { message });
};

export const getMessages = async (driverId) => {
    const response = await axios.get(`/api/chats/${driverId}`);
    return response.data;
};