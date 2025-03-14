// src/contexts/RideContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { searchRides } from '../services/ride';

export const RideContext = createContext();

export const RideProvider = ({ children }) => {
    const [rides, setRides] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            const data = await searchRides();
            setRides(data);
        };
        fetchRides();
    }, []);

    return (
        <RideContext.Provider value={{ rides }}>
            {children}
        </RideContext.Provider>
    );
};