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
        if (!credentials?.identifier || !credentials?.password) {
            window.alert("Identifier and password are required.");
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
                let errorMessage = "Login failed. Please check your credentials.";

                try {
                    const errorData = await response.json();
                    errorMessage = errorData.error || errorMessage;
                } catch (jsonError) {
                    console.warn("Error parsing JSON response:", jsonError);
                }

                window.alert(errorMessage); // Show an alert for invalid login
                throw new Error(errorMessage);
            }

            const userData = await response.json();
            setUser(userData);
            localStorage.setItem("user", JSON.stringify(userData));

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
