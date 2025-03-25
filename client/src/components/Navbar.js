// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css'; // Import the CSS file

const NavbarComponent = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            {/* Brand/Logo */}
            <Link className="navbar-brand" to="/">
                RideShare App
            </Link>

            {/* Hamburger Menu Button for Small Screens */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarContent"
                aria-controls="navbarContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Collapsible Navbar Content */}
            <div className="collapse navbar-collapse" id="navbarContent">
                <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                    {/* Home */}
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-link"
                            to="/"
                        >
                            Home
                        </NavLink>
                    </li>

                    {/* User-Specific Navigation */}
                    {user ? (
                        <>
                            {/* Dashboard (Driver) */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/dashboard"
                                >
                                    Driver Dashboard
                                </NavLink>
                            </li>

                            {/* Ride Creation (Driver) */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/real-time-tracking/:rideId"
                                >
                                    RealTimeTracking
                                </NavLink>
                            </li>
                            {/* Ride Creation (Driver) */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/create-ride"
                                >
                                    Create Ride
                                </NavLink>
                            </li>


                            {/* Passenger Dashboard (Passenger) */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/passenger-dashboard"
                                >
                                    Passenger Dashboard
                                </NavLink>
                            </li>



                            {/* Logout Button */}
                            <li className="nav-item">
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={logout}
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Login */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            </li>

                            {/* Register */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/register"
                                >
                                    Register
                                </NavLink>
                            </li>

                            {/* Contact Us */}
                            <li className="nav-item">
                                <NavLink
                                    exact
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/contact-us"
                                >
                                    Contact Us
                                </NavLink>
                            </li>
                        </>
                    )}

                    {/* Additional Links */}
                    <li className="nav-item">
                        <NavLink
                            exact
                            activeClassName="active"
                            className="nav-link"
                            to="/about-us"
                        >
                            About Us
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavbarComponent;