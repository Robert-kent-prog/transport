// src/components/Footer.jsx

import React from 'react';
import './Footer.css'; // Import the CSS file for styling

const Footer = () => {
    return (
        <footer className="footer bg-light text-center text-lg-start">
            {/* Content inside the footer */}
            <div className="container-fluid p-4">
                {/* Add any footer content here */}
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2025 Rideshare App
            </div>
        </footer>
    );
};

export default Footer;