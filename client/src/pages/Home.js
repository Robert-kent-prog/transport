import React from 'react';
import './RideBookingForm.css';
import RideBookingForm from './RideBookingForm';

function Home() {
    return (
        <div className="App">
            <main>
                <div className="hero-image">
                    <img
                        src="https://source.unsplash.com/random/1600x400/?bus"
                        alt="Buses"
                        className="w-100"
                    />
                    <div className="overlay text-center">
                        <h2>Experience Dignity</h2>
                    </div>
                </div>
                <RideBookingForm />
            </main>
        </div>
    );
}

export default Home;