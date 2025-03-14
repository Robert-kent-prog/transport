// src/pages/PassengerDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const PassengerDashboard = () => {
    return (
        <div className="container mt-5">
            <h2>Passenger Dashboard</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Find a Ride</h5>
                    <p className="card-text">Search for available rides and book them.</p>
                    <Link to="/ride-search" className="btn btn-primary">
                        Search Rides
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PassengerDashboard;