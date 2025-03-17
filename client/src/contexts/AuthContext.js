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
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();
            const userData = {
                email: data.user.email,
                token: data.token,
                role: data.user.role,  // Assuming backend returns user role
            };

            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));
        } catch (error) {
            throw error;
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
