// src/contexts/ChatContext.jsx

import React, { createContext, useState, useEffect } from 'react';
import { getMessages } from '../services/chat';

export const ChatContext = createContext();

export const ChatProvider = ({ children, driverId }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getMessages(driverId);
            setMessages(data);
        };
        fetchMessages();
    }, [driverId]);

    return (
        <ChatContext.Provider value={{ messages }}>
            {children}
        </ChatContext.Provider>
    );
};