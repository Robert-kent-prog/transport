// src/pages/RideCreation.jsx

import React, { useContext } from 'react';
import { MapContext } from '../contexts/MapContext';

const RideCreation = () => {
    const { currentLocation, setCurrentLocation, destination, setDestination, routeDetails } =
        useContext(MapContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating ride:', {
            location: currentLocation,
            destination,
            eta: routeDetails?.legs[0]?.duration.text,
        });
    };

    return (
        <div className="container mt-5">
            <h2>Create a Ride</h2>
            {/* Use Bootstrap's form classes */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="currentLocation" className="form-label">
                        Current Location
                    </label>
                    <input
                        type="text"
                        id="currentLocation"
                        className="form-control"
                        value={currentLocation || ''}
                        onChange={(e) => setCurrentLocation(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="destination" className="form-label">
                        Destination
                    </label>
                    <input
                        type="text"
                        id="destination"
                        className="form-control"
                        value={destination || ''}
                        onChange={(e) => setDestination(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Ride
                </button>
            </form>
        </div>
    );
};

export default RideCreation;