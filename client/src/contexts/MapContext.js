// src/contexts/MapContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [routeDetails, setRouteDetails] = useState(null);

    // Fetch route details using Google Maps API
    const fetchRouteDetails = async () => {
        if (!currentLocation || !destination) return;

        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation}&destination=${destination}&key=YOUR_GOOGLE_MAPS_API_KEY`
            );
            setRouteDetails(response.data.routes[0]);
        } catch (error) {
            console.error('Error fetching route details:', error);
        }
    };

    useEffect(() => {
        fetchRouteDetails();
    }, [currentLocation, destination]);

    return (
        <MapContext.Provider
            value={{
                currentLocation,
                setCurrentLocation,
                destination,
                setDestination,
                routeDetails,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};