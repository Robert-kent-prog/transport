// src/pages/RideSearch.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RideSearch = () => {
    const [rides, setRides] = useState([]);
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [time, setTime] = useState('');
    const [seats, setSeats] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get('/api/rides', {
                params: { pickup, dropoff, time, seats },
            });
            setRides(response.data);
        } catch (error) {
            console.error('Error fetching rides:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Ride Search</h2>
            <form onSubmit={handleSearch}>
                <div className="mb-3">
                    <label htmlFor="pickup" className="form-label">
                        Pickup Location
                    </label>
                    <input
                        type="text"
                        id="pickup"
                        className="form-control"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dropoff" className="form-label">
                        Dropoff Location
                    </label>
                    <input
                        type="text"
                        id="dropoff"
                        className="form-control"
                        value={dropoff}
                        onChange={(e) => setDropoff(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">
                        Preferred Time
                    </label>
                    <input
                        type="time"
                        id="time"
                        className="form-control"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="seats" className="form-label">
                        Available Seats
                    </label>
                    <input
                        type="number"
                        id="seats"
                        className="form-control"
                        value={seats}
                        onChange={(e) => setSeats(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Search Rides
                </button>
            </form>

            <h3 className="mt-4">Available Rides</h3>
            <ul className="list-group">
                {rides.map((ride) => (
                    <li key={ride.id} className="list-group-item">
                        <strong>{ride.driverName}</strong> - From {ride.pickup} to {ride.dropoff}
                        <br />
                        Time: {ride.time}, Seats: {ride.seatsAvailable}, Price: ${ride.price || 'Free'}
                        <Link to={`/booking/${ride.id}`} className="btn btn-sm btn-success float-end">
                            Book Now
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RideSearch;