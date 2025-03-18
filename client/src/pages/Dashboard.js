import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
    const [rides, setRides] = useState([]); // State to store fetched rides

    // Fetch rides from the backend when the component mounts
    useEffect(() => {
        const fetchRides = async () => {
            // Retrieve the access token from localStorage
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('No access token found in localStorage');
                alert('You are not authenticated. Please log in.');
                return;
            }

            try {
                const response = await axios.get('http://20.0.161.221:5000/api/rides/all', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
                    },
                });
                setRides(response.data); // Store the fetched rides in state
            } catch (error) {
                console.error('Error fetching rides:', error.response?.data || error.message);
                alert('Failed to fetch rides. Please try again.');
            }
        };

        fetchRides();
    }, []);

    // Handle "BookOnPay" button click
    const handleBookOnPay = (rideId) => {
        alert(`Booking ride with ID: ${rideId}`);
        // You can redirect to a booking page or trigger a payment process here
    };

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
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Available Seats</th>
                        <th>Bookings</th> {/* New column for BookOnPay button */}
                    </tr>
                </thead>
                <tbody>
                    {rides.map((ride) => (
                        <tr key={ride._id}>
                            <td>{ride._id}</td> {/* Ride ID */}
                            <td>{ride.pickupLocation}</td>
                            <td>{ride.dropoffLocation}</td>
                            <td>{new Date(ride.departureTime).toLocaleTimeString()}</td>
                            <td>{new Date(ride.arrivalTime).toLocaleTimeString()}</td>
                            <td>{ride.availableSeats}</td>
                            <td>
                                {/* BookOnPay button */}
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleBookOnPay(ride._id)}
                                >
                                    BookOnPay
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DriverDashboard;