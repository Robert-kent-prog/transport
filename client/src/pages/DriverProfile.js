// src/pages/DriverProfile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DriverProfile = () => {
    const { driverId } = useParams();
    const [driver, setDriver] = useState(null);

    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const response = await axios.get(`/api/drivers/${driverId}`);
                setDriver(response.data);
            } catch (error) {
                console.error('Error fetching driver details:', error);
            }
        };
        fetchDriverDetails();
    }, [driverId]);

    if (!driver) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>Driver Profile</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{driver.name}</h5>
                    <p className="card-text">
                        Car: {driver.carMake} {driver.carModel}
                        <br />
                        License Plate: {driver.licensePlate}
                        <br />
                        Ratings: {driver.ratings} stars
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DriverProfile;