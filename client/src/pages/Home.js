import React from 'react';
import './Home.css'; // New CSS file for home page
import RideBookingForm from './RideBookingForm';

function Home() {
    return (
        <div className="home-container">
            {/* Hero Section with Call-to-Action */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Travel with Comfort & Dignity</h1>
                    <p className="hero-subtitle">Book your bus ride across Kenya with ease and confidence</p>

                    {/* Booking Form Section */}
                    <div className="booking-form-container">
                        <RideBookingForm />
                    </div>
                </div>
            </section>

            {/* Value Proposition Section */}
            <section className="value-proposition">
                <div className="container">
                    <h2 className="section-title">Why Choose Us?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚌</div>
                            <h3>Modern Fleet</h3>
                            <p>Travel in comfort with our well-maintained, air-conditioned buses.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⏱️</div>
                            <h3>On-Time Service</h3>
                            <p>We pride ourselves on punctuality and reliable schedules.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <h3>Safe Travel</h3>
                            <p>Your safety is our top priority with professional drivers.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">💰</div>
                            <h3>Affordable Prices</h3>
                            <p>Quality service at competitive prices across Kenya.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <div className="container">
                    <h2 className="section-title">What Our Customers Say</h2>
                    <div className="testimonial-grid">
                        <div className="testimonial-card">
                            <p>"The most comfortable bus ride I've had in Kenya. Will definitely use this service again!"</p>
                            <div className="testimonial-author">- James M., Nairobi</div>
                        </div>
                        <div className="testimonial-card">
                            <p>"Booking was so easy and the bus arrived right on time. Excellent service!"</p>
                            <div className="testimonial-author">- Sarah K., Mombasa</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;