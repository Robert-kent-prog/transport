// src/pages/BookingConfirmation.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingConfirmation = () => {
    const { rideId } = useParams();
    const [ride, setRide] = useState(null);

    useEffect(() => {
        const fetchRideDetails = async () => {
            try {
                const response = await axios.get(`/api/rides/${rideId}`);
                setRide(response.data);
            } catch (error) {
                console.error('Error fetching ride details:', error);
            }
        };
        fetchRideDetails();
    }, [rideId]);

    const handleConfirmBooking = async () => {
        try {
            await axios.post(`/api/bookings`, { rideId });
            alert('Booking confirmed!');
        } catch (error) {
            console.error('Error confirming booking:', error);
        }
    };

    if (!ride) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2>Booking Confirmation</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{ride.driverName}'s Ride</h5>
                    <p className="card-text">
                        From {ride.pickup} to {ride.dropoff}
                        <br />
                        Time: {ride.time}, Seats: {ride.seatsAvailable}, Price: ${ride.price || 'Free'}
                    </p>
                    <button onClick={handleConfirmBooking} className="btn btn-primary">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;