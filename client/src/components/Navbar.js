// src/components/Navbar.js

import React, { useContext } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap'; // Removed NavDropdown
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import './Navbar.css'; // Optional: Custom styles

const NavbarComponent = () => {
    const { user, logout } = useContext(AuthContext); // Use AuthContext to check user state

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container>
                {/* Brand/Logo */}
                <Navbar.Brand href="/">RideShare App</Navbar.Brand>

                {/* Hamburger Menu Button for Small Screens */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                {/* Collapsible Navbar Content */}
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {/* Home */}
                        <Nav.Link href="/">Home</Nav.Link>

                        {/* Conditional Rendering Based on User Authentication */}
                        {user ? (
                            <>
                                {/* Driver Dashboard */}
                                <Nav.Link href="/dashboard">Driver Dashboard</Nav.Link>

                                {/* Real-Time Tracking */}
                                <Nav.Link href="/real-time-tracking/:rideId">RealTimeTracking</Nav.Link>

                                {/* Create Ride */}
                                <Nav.Link href="/create-ride">Create Ride</Nav.Link>

                                {/* Passenger Dashboard */}
                                <Nav.Link href="/passenger-dashboard">Passenger Dashboard</Nav.Link>

                                {/* Logout Button */}
                                <Nav.Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={logout}
                                        style={{ marginLeft: '0.5rem' }}
                                    >
                                        Logout
                                    </button>
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                {/* Login */}
                                <Nav.Link href="/login">Login</Nav.Link>

                                {/* Register */}
                                <Nav.Link href="/register">Register</Nav.Link>
                            </>
                        )}
                        {/* About Us */}
                        <Nav.Link href="/about-us">About Us</Nav.Link>

                        {/* Contact Us */}
                        <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;