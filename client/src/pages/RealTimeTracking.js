// src/pages/RealTimeTracking.jsx

import React from 'react';
import GoogleMapReact from 'google-map-react';

const RealTimeTracking = ({ driverLocation }) => {
    const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Default San Francisco coordinates

    return (
        <div className="container mt-5">
            <h2>Track Your Driver</h2>
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
                    defaultCenter={defaultCenter}
                    defaultZoom={11}
                >
                    <div
                        lat={driverLocation.lat}
                        lng={driverLocation.lng}
                        text="Driver Location"
                    />
                </GoogleMapReact>
            </div>
        </div>
    );
};

export default RealTimeTracking;