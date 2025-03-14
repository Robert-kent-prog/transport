// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css'; // Import the CSS file

const NavbarComponent = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid d-flex justify-content-center">
                <div className="navbar-collapse collapse w-100" id="navbarContent">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
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
                        {/* {user ? ( */}
                        <>
                            {/* Dashboard (Driver) */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/dashboard"
                                >
                                    Dashboard
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

                            {/* Ride Search (Passenger) */}
                            <li className="nav-item">
                                <NavLink
                                    activeClassName="active"
                                    className="nav-link"
                                    to="/ride-search"
                                >
                                    Ride Search
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
                        {/* ) : ( */}
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
                        {/* )} */}

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
                        {/* <li className="nav-item">
                            <NavLink
                                exact
                                activeClassName="active"
                                className="nav-link"
                                to="/contact-us"
                            >
                                Contact Us
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavbarComponent;