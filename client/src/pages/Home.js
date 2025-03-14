// src/pages/Home.js

import React from 'react';

const Home = () => {
    return (
        <div className="container mt-5">
            {/* Custom Jumbotron using Bootstrap utility classes */}
            <div className="p-5 mb-4 bg-light rounded-3">
                <h1 className="display-4">Welcome to RideShare</h1>
                <p className="lead">Find or offer rides with ease!</p>
                <a href="/register" className="btn btn-primary btn-lg">
                    Get Started
                </a>
            </div>
        </div>
    );
};

export default Home;