// src/pages/RideCreation.jsx

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'; // For API calls
import { MapContext } from '../contexts/MapContext';

const RideCreation = () => {
    const { routeDetails } =
        useContext(MapContext);

    // State for new fields: Departure Time, Arrival Time, Available Seats, and fetched car details
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [driverDetails, setDriverDetails] = useState(null); // To store fetched driver details

    useEffect(() => {
        // Fetch driver details from the backend on component mount
        const fetchDriverDetails = async () => {
            try {
                const response = await axios.get('/api/users/me'); // Endpoint to fetch authenticated user details
                setDriverDetails(response.data);
            } catch (error) {
                console.error('Error fetching driver details:', error);
            }
        };

        fetchDriverDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!currentLocation || !destination || !departureTime || !arrivalTime || !availableSeats) {
            alert('Please fill in all required fields.');
            return;
        }

        // Prepare the ride payload
        const ridePayload = {
            pickupLocation: currentLocation,
            dropoffLocation: destination,
            departureTime: `${new Date().toISOString().split('T')[0]}T${departureTime}:00`, // Format departure time
            arrivalTime: `${new Date().toISOString().split('T')[0]}T${arrivalTime}:00`, // Format arrival time
            availableSeats: parseInt(availableSeats, 10), // Convert to number
        };

        try {
            // Send the ride creation request to the backend
            await axios.post('/api/rides/create', ridePayload);

            alert('Ride created successfully!');
            // Reset form fields after successful submission
            setCurrentLocation('');
            setDestination('');
            setDepartureTime('');
            setArrivalTime('');
            setAvailableSeats('');
        } catch (error) {
            alert('Failed to create ride. Please try again.');
            console.error('Error creating ride:', error.response?.data || error.message);
        }
    };

    if (!driverDetails || driverDetails.role !== 'driver') {
        return <div>Loading...</div>; // Wait for driver details or restrict access if not a driver
    }

    return (
        <div className="container mt-5">
            <h2>Create a Ride</h2>
            {/* Use Bootstrap's form classes */}
            <form onSubmit={handleSubmit}>
                {/* Current Location Field */}
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
                        placeholder="Enter your current location"
                        required
                    />
                </div>

                {/* Destination Field */}
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
                        placeholder="Enter your destination"
                        required
                    />
                </div>

                {/* Departure Time Field */}
                <div className="mb-3">
                    <label htmlFor="departureTime" className="form-label">
                        Departure Time
                    </label>
                    <input
                        type="time"
                        id="departureTime"
                        className="form-control"
                        value={departureTime}
                        onChange={(e) => setDepartureTime(e.target.value)}
                        required
                    />
                </div>

                {/* Arrival Time Field */}
                <div className="mb-3">
                    <label htmlFor="arrivalTime" className="form-label">
                        Arrival Time
                    </label>
                    <input
                        type="time"
                        id="arrivalTime"
                        className="form-control"
                        value={arrivalTime}
                        onChange={(e) => setArrivalTime(e.target.value)}
                        required
                    />
                </div>

                {/* Available Seats Field */}
                <div className="mb-3">
                    <label htmlFor="availableSeats" className="form-label">
                        Available Seats
                    </label>
                    <input
                        type="number"
                        id="availableSeats"
                        className="form-control"
                        value={availableSeats}
                        onChange={(e) => setAvailableSeats(e.target.value)}
                        min="1"
                        required
                    />
                </div>

                {/* Display Car Details (Read-Only) */}
                <div className="mb-3">
                    <p>
                        <strong>Car Make:</strong>{' '}
                        {driverDetails.carDetails?.make || 'Not available'}
                    </p>
                    <p>
                        <strong>Car Model:</strong>{' '}
                        {driverDetails.carDetails?.model || 'Not available'}
                    </p>
                    <p>
                        <strong>License Plate:</strong>{' '}
                        {driverDetails.carDetails?.licensePlate || 'Not available'}
                    </p>
                    <p>
                        <strong>Seating Capacity:</strong>{' '}
                        {driverDetails.carDetails?.seatingCapacity || 'Not available'}
                    </p>
                </div>

                {/* Display ETA and Distance if route details are available */}
                {routeDetails && (
                    <div className="mb-3">
                        <p>
                            <strong>Estimated Time of Arrival (ETA):</strong>{' '}
                            {routeDetails?.legs[0]?.duration.text || 'Not available'}
                        </p>
                        <p>
                            <strong>Distance:</strong>{' '}
                            {routeDetails?.legs[0]?.distance.text || 'Not available'}
                        </p>
                    </div>
                )}

                {/* Submit button */}
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                        !currentLocation ||
                        !destination ||
                        !departureTime ||
                        !arrivalTime ||
                        !availableSeats
                    }
                >
                    Create Ride
                </button>
            </form>
        </div>
    );
};

export default RideCreation;