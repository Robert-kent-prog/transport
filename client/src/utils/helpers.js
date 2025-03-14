// src/utils/helpers.js

// Function to validate email format
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Function to calculate ETA based on distance and average speed
export const calculateETA = (distanceInMeters, averageSpeedKph = 50) => {
    const distanceInKm = distanceInMeters / 1000;
    const timeInHours = distanceInKm / averageSpeedKph;
    const timeInMinutes = Math.ceil(timeInHours * 60);
    return `${timeInMinutes} minutes`;
};

// Function to format date and time
export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

// Function to format time
export const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}Z`).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
    });
};