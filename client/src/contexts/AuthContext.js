// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';
import { login, logout, getUser } from '../services/auth'; // Import individual functions

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser(); // Use the imported getUser function
                setUser(userData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const loginAction = async (credentials) => {
        const userData = await login(credentials); // Use the imported login function
        setUser(userData);
    };

    const logoutAction = async () => {
        await logout(); // Use the imported logout function
        setUser(null);
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login: loginAction, logout: logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};