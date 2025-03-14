// src/utils/matchingAlgorithm.js

export const matchRides = (passengerRide, availableRides) => {
    return availableRides.filter((ride) => {
        const pickupMatch = ride.pickup === passengerRide.pickup;
        const dropoffMatch = ride.dropoff === passengerRide.dropoff;
        const timeMatch = Math.abs(new Date(ride.time) - new Date(passengerRide.time)) < 30 * 60 * 1000; // Within 30 minutes
        const seatsMatch = ride.seatsAvailable >= passengerRide.passengers;

        return pickupMatch && dropoffMatch && timeMatch && seatsMatch;
    });
};