import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const RealTimeTracking = () => {
    const defaultProps = {
        center: {
            lat: 1.375081,
            lng: 37.995213
        },
        zoom: 11
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyCvYWF05iifWuBkQaVIKMC0C6Q7yWZzCFw' }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={1.375081}
                    lng={37.995213}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}

export default RealTimeTracking;