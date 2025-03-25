// src/pages/RideCreation.jsx

import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios'; // For API calls
import { MapContext } from '../contexts/MapContext';
import { jwtDecode } from "jwt-decode";

const RideCreation = () => {
    const { routeDetails } =
        useContext(MapContext);

    // State for new fields: Departure Time, Arrival Time, Available Seats, and fetched car details
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [ridePrice, setRidePrice] = useState('');
    const [driverDetails, setDriverDetails] = useState(null); // To store fetched driver details

    useEffect(() => {
        // Fetch driver details from the backend on component mount
        const fetchDriverDetails = async () => {
            try {
                // Retrieve the access token from localStorage
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    console.error('No access token found in localStorage');
                    return;
                }

                // Decode the access token to get user ID and role
                const decodedToken = jwtDecode(accessToken);
                const userId = decodedToken.userId; // Assuming the token contains a `userId` field
                const role = decodedToken.role; // Assuming the token contains a `role` field

                // Check if the user is a driver
                if (role !== 'driver') {
                    console.error('User is not a driver');
                    return;
                }

                // Fetch driver details using the user ID
                const response = await axios.get(`http://20.0.135.221:5000/api/auth/users/${userId}`); // Endpoint to fetch driver details
                setDriverDetails(response.data); // Set the fetched driver details in state
            } catch (error) {
                console.error('Error fetching driver details:', error);
            }
        };

        fetchDriverDetails();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!currentLocation || !destination || !departureTime || !arrivalTime || !availableSeats || !ridePrice) {
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
            ridePrice: parseInt(ridePrice),
        };

        try {
            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('No access token found in localStorage');
                alert('You are not authenticated. Please log in.');
                return;
            }

            // Send the ride creation request to the backend with the Authorization header
            await axios.post(
                'http://20.0.135.221:5000/api/rides/create',
                ridePayload,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
                    },
                }
            );

            alert('Ride created successfully!');
            // Reset form fields after successful submission
            setCurrentLocation('');
            setDestination('');
            setDepartureTime('');
            setArrivalTime('');
            setAvailableSeats('');
            setRidePrice('');
        } catch (error) {
            alert('Failed to create ride. Please try again.');
            console.error('Error creating ride:', error.response?.data || error.message);
        }
    };

    if (!driverDetails || driverDetails.role !== 'driver') {
        return <div>Loading...</div>; // Wait for driver details or restrict access if not a driver
    }

    return (
        <div className="container mt-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 className="text-center" style={{ fontSize: '39px', fontWeight: "700" }}>Create a Ride</h2>
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
                {/* Available Seats Field */}
                <div className="mb-3">
                    <label htmlFor="rideprice" className="form-label">
                        Amount
                    </label>
                    <input
                        type="number"
                        id="availableSeats"
                        className="form-control"
                        value={ridePrice}
                        onChange={(e) => setRidePrice(e.target.value)}
                        min="1"
                        required
                        placeholder="Enter the Amount"
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