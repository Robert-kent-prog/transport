import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import driverFallbackImage from '../images/driver.png'; // Adjust the path as needed

const DriverProfile = () => {
    // const { rideId } = useParams(); // Extract ride ID from URL
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
                const userId = decodedToken.userId;
                const role = decodedToken.role;

                // Check if the user is a driver
                if (role !== 'driver') {
                    console.error('User is not a driver');
                    return;
                }

                // Fetch driver details using the user ID
                const response = await axios.get(`http://192.168.100.16:5000/api/auth/users/${userId}`); // Endpoint to fetch driver details
                setDriverDetails(response.data);
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

    // Helper function to render star ratings
    const renderStars = (rating) => {
        const stars = [];
        const maxStars = 5;
        const filledStars = Math.round(rating);

        for (let i = 1; i <= maxStars; i++) {
            stars.push(
                <span key={i} className={`star ${i <= filledStars ? 'filled' : 'empty'}`}>
                    &#9733;
                </span>
            );
        }

        return stars;
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '1100px', margin: '0 auto' }}>
            <h2 className="text-center mb-4" style={{ fontSize: '39px', fontWeight: "700" }}>Driver Profile</h2>
            <div className="card shadow-lg">
                <div className="row g-0">
                    {/* Profile Image Section */}
                    <div className="col-md-4 d-flex align-items-center justify-content-center bg-light">
                        <img
                            src={driverDetails.profileImage || driverFallbackImage} // Fixed file path
                            alt="Driver Profile"
                            className="img-fluid rounded-circle border border-3 border-primary p-2"
                            style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                    </div>

                    {/* Driver Details Section */}
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{driverDetails.name || 'Not available'}</h5>
                            <p className="card-text">
                                <strong>Car:</strong> {driverDetails.carDetails?.make || 'Not available'}{' '}
                                {driverDetails.carDetails?.model || 'Not available'}
                                <br />
                                <strong>License Plate:</strong> {driverDetails.carDetails?.licensePlate || 'Not available'}
                                <br />
                                <strong>Ratings:</strong> {renderStars(driverDetails.ratings || 0)} stars
                                <br />
                                <strong>About:</strong> {driverDetails.bio || 'No bio available'}
                            </p>

                            {/* Contact and Email Buttons */}
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => window.location.href = `tel:${driverDetails.phone}`}
                                >
                                    Call Driver
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => window.location.href = `mailto:${driverDetails.email}`}
                                >
                                    Email Driver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Sections */}
            <div className="mt-5">
                <h4>Safety Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">Clean Driving Record: {driverDetails.cleanRecord ? 'Yes' : 'No'}</li>
                    <li className="list-group-item">Years of Experience: {driverDetails.yearsOfExperience || 'Not available'}</li>
                </ul>
            </div>

            <div className="mt-5">
                <h4>Reviews</h4>
                <div className="alert alert-info" role="alert">
                    No reviews available yet.
                </div>
            </div>
        </div>
    );
};

export default DriverProfile;