import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="site-footer">
            <Container fluid>
                <Row className="footer-content">
                    <Col lg={4} md={6} className="footer-col">
                        <div className="footer-brand">
                            <h3>RideShare</h3>
                            <p className="tagline">Connecting riders, simplifying journeys</p>
                        </div>
                        <div className="social-links">
                            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
                            <a href="https://twitter.com" aria-label="Twitter"><FaTwitter /></a>
                            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
                            <a href="https://linkedin.com" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                    </Col>

                    <Col lg={2} md={6} className="footer-col">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/about-us">About Us</a></li>
                            <li><a href="/contact-us">Contact</a></li>
                            <li><a href="/privacy-policy">Privacy Policy</a></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6} className="footer-col">
                        <h4>Services</h4>
                        <ul className="footer-links">
                            <li><a href="/driver-dashboard">Driver Dashboard</a></li>
                            <li><a href="/passenger-dashboard">Passenger Dashboard</a></li>
                            <li><a href="/real-time-tracking">Real-Time Tracking</a></li>
                            <li><a href="/create-ride">Create a Ride</a></li>
                        </ul>
                    </Col>

                    <Col lg={3} md={6} className="footer-col">
                        <h4>Contact Info</h4>
                        <ul className="contact-info">
                            <li><i className="icon-placeholder"></i> 123 Ride St, Mobility City</li>
                            <li><i className="icon-phone"></i> +1 (555) 123-4567</li>
                            <li><i className="icon-email"></i> support@rideshareapp.com</li>
                        </ul>
                    </Col>
                </Row>

                <Row className="footer-bottom">
                    <Col className="text-center">
                        <p className="copyright">
                            &copy; {new Date().getFullYear()} RideShare App. All rights reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;