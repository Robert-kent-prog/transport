import React from 'react';
import './About.css';
const AboutUs = () => {
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    {/* Title */}
                    <h1 className="mb-4">About Us</h1>
                    <p className="lead fs-5 mb-5">
                        Welcome to <strong>RideShare</strong>, a revolutionary ride-sharing platform designed to make commuting easier, greener, and more affordable!
                    </p>

                    {/* Section 1: Mission */}
                    <h2 className="text-start">Our Mission</h2>
                    <p className="text-left mb-4">
                        At RideShare, our mission is to connect drivers with empty seats to passengers who need rides. We aim to reduce transportation costs, minimize environmental impact, and foster a sense of community among travelers.
                    </p>

                    {/* Section 2: Features */}
                    <h2 className="text-start">Key Features</h2>
                    <ul className="list-unstyled text-left">
                        <li className="mb-2"><i className="fas fa-check-circle me-2 text-primary"></i>Drivers can list available seats, departure times, and destinations.</li>
                        <li className="mb-2"><i className="fas fa-check-circle me-2 text-primary"></i>Passengers can search for rides and book seats easily.</li>
                        <li className="mb-2"><i className="fas fa-check-circle me-2 text-primary"></i>Real-time location tracking for seamless coordination.</li>
                        <li className="mb-2"><i className="fas fa-check-circle me-2 text-primary"></i>Secure payment integration for hassle-free transactions.</li>
                        <li className="mb-2"><i className="fas fa-check-circle me-2 text-primary"></i>User reviews and ratings to ensure trust and reliability.</li>
                    </ul>

                    {/* Section 3: Benefits */}
                    <h2 className="text-start">Why Choose RideShare?</h2>
                    <p className="text-center mb-4">
                        RideShare is more than just a ride-sharing app. It’s a platform that brings people together, reduces travel costs, and promotes eco-friendly commuting. Whether you're a driver or a passenger, RideShare has something for everyone.
                    </p>

                    {/* Call to Action */}
                    <div className="mt-5">
                        <a href="/register" className="btn btn-primary btn-lg">Join Us Today!</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;