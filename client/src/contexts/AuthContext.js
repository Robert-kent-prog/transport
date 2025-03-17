import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = () => {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const loginAction = async (credentials) => {
        if (!credentials || !credentials.identifier || !credentials.password) {
            console.error("Invalid credentials object:", credentials);
            return Promise.reject(new Error("Identifier and password are required"));
        }

        try {
            console.log("Sending login request with:", credentials);

            const response = await fetch("http://20.0.25.50:5000/api/authenticate/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Login failed. Please check your credentials.");
            }

            const userData = await response.json();
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

            return Promise.resolve();
        } catch (error) {
            console.error("Login error:", error);
            return Promise.reject(error);
        }
    };


    const logoutAction = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login: loginAction, logout: logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};
