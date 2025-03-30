import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DriverDashboard = () => {
    const [rides, setRides] = useState([]); // State to store fetched rides
    const [filteredRides, setFilteredRides] = useState([]); // State to store filtered rides
    const [pickupLocation, setPickupLocation] = useState(''); // State for pickup location input
    const [dropoffLocation, setDropoffLocation] = useState(''); // State for dropoff location input
    const navigate = useNavigate();

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
                const response = await axios.get('http://20.0.113.122:5000/api/rides/all', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
                    },
                });
                setRides(response.data); // Store the fetched rides in state
                setFilteredRides(response.data); // Initialize filtered rides with all rides
            } catch (error) {
                console.error('Error fetching rides:', error.response?.data || error.message);
                alert('Failed to fetch rides. Please try again.');
            }
        };

        fetchRides();
    }, []);

    // Handle search functionality
    const handleSearch = () => {
        // Filter rides based on pickup and dropoff locations
        const filtered = rides.filter((ride) => {
            const matchesPickup = pickupLocation
                ? ride.pickupLocation.toLowerCase().includes(pickupLocation.toLowerCase())
                : true;
            const matchesDropoff = dropoffLocation
                ? ride.dropoffLocation.toLowerCase().includes(dropoffLocation.toLowerCase())
                : true;

            return matchesPickup && matchesDropoff;
        });

        setFilteredRides(filtered); // Update filtered rides state
    };

    // Handle "BookOnPay" button click
    const handleBookOnPay = (rideId) => {
        navigate(`/payment-options/${rideId}`);
    };

    return (
        <div className="container mt-5">
            <h2>Passenger Dashboard</h2>

            {/* Search Form */}
            <div className="row mb-4">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Pickup Location"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                    />
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Destination"
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                    />
                </div>
                <div className="col-md-12 text-center mt-3">
                    <button className="btn btn-success" onClick={handleSearch}>
                        Search Rides
                    </button>
                </div>
            </div>

            {/* Display Filtered Rides */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Available Seats</th>
                        <th>Amount</th>
                        <th>Bookings</th> {/* New column for BookOnPay button */}
                    </tr>
                </thead>
                <tbody>
                    {filteredRides.length > 0 ? (
                        filteredRides.map((ride) => (
                            <tr key={ride._id}>
                                <td>{ride._id}</td> {/* Ride ID */}
                                <td>{ride.pickupLocation}</td>
                                <td>{ride.dropoffLocation}</td>
                                <td>{new Date(ride.departureTime).toLocaleTimeString()}</td>
                                <td>{new Date(ride.arrivalTime).toLocaleTimeString()}</td>
                                <td>{ride.availableSeats}</td>
                                <td>{ride.ridePrice || 'N/A'}</td>
                                <td>
                                    {/* BookOnPay button */}
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => handleBookOnPay(ride._id, ride.ridePrice)}
                                    >
                                        BookOnPay
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">
                                No rides found matching your criteria.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DriverDashboard;