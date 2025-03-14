// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light text-center text-lg-start">
            {/* Use Bootstrap's container, row, and col classes */}
            <div className="container-fluid p-4">
            </div>
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2023 Rideshare App
            </div>
        </footer>
    );
};

export default Footer;