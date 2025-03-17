// src/contexts/MapContext.jsx

import React, { createContext, useState } from 'react';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
    // Hardcoded values for current location, destination, and route details
    // const [currentLocation, setCurrentLocation] = useState("New York, NY");
    // const [destination, setDestination] = useState("Los Angeles, CA");
    const [routeDetails, setRouteDetails] = useState({
        legs: [
            {
                duration: {
                    text: "2 hours 15 minutes",
                },
                distance: {
                    text: "36 KM",
                },
            },
        ],
    });

    return (
        <MapContext.Provider
            value={{
                // currentLocation,
                // setCurrentLocation,
                // destination,
                // setDestination,
                routeDetails,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};