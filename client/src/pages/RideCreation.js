// src/pages/RideCreation.jsx

import React, { useContext, useState } from 'react';
import { MapContext } from '../contexts/MapContext';

const RideCreation = () => {
    const { currentLocation, setCurrentLocation, destination, setDestination, routeDetails } =
        useContext(MapContext);

    // State for new fields: Departure Time, Arrival Time, Available Seats, and Car Details
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [availableSeats, setAvailableSeats] = useState('');
    const [carMake, setCarMake] = useState(''); // Car Make
    const [carModel, setCarModel] = useState(''); // Car Model
    const [licensePlate, setLicensePlate] = useState(''); // License Plate

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (
            !currentLocation ||
            !destination ||
            !departureTime ||
            !arrivalTime ||
            !availableSeats ||
            !carMake ||
            !carModel ||
            !licensePlate
        ) {
            alert('Please fill in all fields.');
            return;
        }

        // Log the ride details
        console.log('Creating ride:', {
            location: currentLocation,
            destination,
            departureTime,
            arrivalTime,
            availableSeats: parseInt(availableSeats, 10), // Convert to number
            carDetails: {
                make: carMake,
                model: carModel,
                licensePlate,
            },
            eta: routeDetails?.legs[0]?.duration.text || 'Not available',
            distance: routeDetails?.legs[0]?.distance.text || 'Not available',
        });

        // Reset form fields (optional)
        // setCurrentLocation('');
        // setDestination('');
        // setDepartureTime('');
        // setArrivalTime('');
        // setAvailableSeats('');
        // setCarMake('');
        // setCarModel('');
        // setLicensePlate('');
    };

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

                {/* Car Make Field */}
                <div className="mb-3">
                    <label htmlFor="carMake" className="form-label">
                        Car Make
                    </label>
                    <input
                        type="text"
                        id="carMake"
                        className="form-control"
                        value={carMake}
                        onChange={(e) => setCarMake(e.target.value)}
                        placeholder="Enter car make (e.g., Toyota)"
                        required
                    />
                </div>

                {/* Car Model Field */}
                <div className="mb-3">
                    <label htmlFor="carModel" className="form-label">
                        Car Model
                    </label>
                    <input
                        type="text"
                        id="carModel"
                        className="form-control"
                        value={carModel}
                        onChange={(e) => setCarModel(e.target.value)}
                        placeholder="Enter car model (e.g., Camry)"
                        required
                    />
                </div>

                {/* License Plate Field */}
                <div className="mb-3">
                    <label htmlFor="licensePlate" className="form-label">
                        License Plate
                    </label>
                    <input
                        type="text"
                        id="licensePlate"
                        className="form-control"
                        value={licensePlate}
                        onChange={(e) => setLicensePlate(e.target.value)}
                        placeholder="Enter license plate (e.g., ABC123)"
                        required
                    />
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
                        !availableSeats ||
                        !carMake ||
                        !carModel ||
                        !licensePlate
                    }
                >
                    Create Ride
                </button>
            </form>
        </div>
    );
};

export default RideCreation;