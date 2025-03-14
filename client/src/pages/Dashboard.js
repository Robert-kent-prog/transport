// src/pages/Dashboard.jsx

import React from 'react';

const DriverDashboard = () => {
    const rides = [
        { id: 1, location: 'Home', destination: 'Work', atime: '7:00 AM', dtime: '8:00 AM', seats: 2 },
        { id: 2, location: 'Work', destination: 'Home', atime: '5:00 PM', dtime: '9:00 AM', seats: 3 },
    ];

    return (
        <div className="container mt-5">
            <h2>Driver Dashboard</h2>
            {/* Use Bootstrap's table classes */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Destination</th>
                        <th>Depature Time</th>
                        <th>Arrival Time</th>
                        <th>Available Seats</th>
                    </tr>
                </thead>
                <tbody>
                    {rides.map((ride) => (
                        <tr key={ride.id}>
                            <td>{ride.id}</td>
                            <td>{ride.location}</td>
                            <td>{ride.destination}</td>
                            <td>{ride.atime}</td>
                            <td>{ride.dtime}</td>
                            <td>{ride.seats}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriverDashboard;