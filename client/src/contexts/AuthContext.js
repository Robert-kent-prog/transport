// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const hardcodedCredentials = {
    email: "admin@gmail.com",
    password: "password123",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Simulate fetching user data (e.g., on page refresh)
    useEffect(() => {
        const fetchUser = () => {
            // Simulate checking if the user is already logged in
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser)); // Set the user from localStorage
            }
            setLoading(false); // Mark loading as complete
        };

        fetchUser();
    }, []);

    // Hardcoded login function
    const loginAction = async (credentials) => {
        return new Promise((resolve, reject) => {
            if (
                credentials.email === hardcodedCredentials.email &&
                credentials.password === hardcodedCredentials.password
            ) {
                const userData = { email: credentials.email }; // Simulate user data
                setUser(userData); // Set the logged-in user
                localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
                resolve(); // Resolve the promise for successful login
            } else {
                reject(new Error("Invalid email or password")); // Reject the promise for failed login
            }
        });
    };

    // Hardcoded logout function
    const logoutAction = () => {
        setUser(null); // Clear the logged-in user
        localStorage.removeItem("user"); // Remove user from localStorage
    };

    if (loading) return null; // Show nothing while loading

    return (
        <AuthContext.Provider value={{ user, login: loginAction, logout: logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};