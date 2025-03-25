import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const DriverProfile = () => {
    const { rideId } = useParams(); // Extract ride ID from URL
    const [driverDetails, setDriverDetails] = useState(null); // To store fetched driver details

    useEffect(() => {
        // Fetch driver details from the backend on component mount
        const fetchDriverDetails = async () => {
            try {
                console.log('use effect successfully called');

                // Retrieve the access token from localStorage
                const accessToken = localStorage.getItem('accessToken');
                console.log("Token found", accessToken);
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
                console.log('fetched driver details', response.data);
                setDriverDetails(response.data); // Set the fetched driver details in state
            } catch (error) {
                console.error('Error fetching driver details:', error);
            }
        };

        fetchDriverDetails();
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Fallback rendering while data is loading
    if (!driverDetails) {
        return <div className="container mt-5">Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Driver Profile</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{driverDetails.name || 'Not available'}</h5>
                    <p className="card-text">
                        Car: <strong>{driverDetails.carDetails?.make || 'Not available'}{' '}
                            {driverDetails.carDetails?.model || 'Not available'}</strong>
                        <br />
                        License Plate: <strong>{driverDetails.carDetails?.licensePlate || 'Not available'}</strong>
                        <br />
                        Ratings: <strong>{driverDetails.ratings || 'Not available'}</strong> stars
                        <br />
                        Phone: <strong>{driverDetails.phone || 'Not available'}</strong>
                        <br />
                        Email: <strong>{driverDetails.email || 'Not available'}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverProfile;