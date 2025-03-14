// src/pages/Chat.jsx

import React, { useState } from 'react';

const Chat = ({ driverId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        try {
            // Simulate sending a message
            setMessages([...messages, { text: newMessage, sender: 'passenger' }]);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>In-App Chat</h2>
            <div className="chat-box" style={{ border: '1px solid #ccc', padding: '1rem', maxHeight: '300px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender === 'passenger' ? 'sent' : 'received'}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-group mt-3">
                <input
                    type="text"
                    className="form-control"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button className="btn btn-primary" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;