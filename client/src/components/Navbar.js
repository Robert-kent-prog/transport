import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar, Button, Offcanvas } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import './Navbar.css';

const NavbarComponent = () => {
    const { user, logout } = useContext(AuthContext);
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);

    return (
        <Navbar expand="lg" fixed="top" className="custom-navbar">
            <Container fluid>
                <Navbar.Brand href="/" className="navbar-brand">
                    <span className="brand-text">RideShare</span>
                    <span className="brand-app">App</span>
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="offcanvasNavbar"
                    onClick={handleShow}
                    className="navbar-toggler"
                >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                </Navbar.Toggle>

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                    show={showOffcanvas}
                    onHide={handleClose}
                    className="custom-offcanvas"
                >
                    <Offcanvas.Header closeButton className="offcanvas-header">
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            RideShare Menu
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/" onClick={handleClose}>Home</Nav.Link>

                            {user ? (
                                <>
                                    <Nav.Link href="/dashboard" onClick={handleClose}>Driver Dashboard</Nav.Link>
                                    <Nav.Link href="/real-time-tracking/:rideId" onClick={handleClose}>Real-Time Tracking</Nav.Link>
                                    <Nav.Link href="/create-ride" onClick={handleClose}>Create Ride</Nav.Link>
                                    <Nav.Link href="/passenger-dashboard" onClick={handleClose}>Passenger Dashboard</Nav.Link>

                                    <div className="d-lg-none">
                                        <Button
                                            variant="danger"
                                            onClick={() => {
                                                logout();
                                                handleClose();
                                            }}
                                            className="logout-btn-mobile"
                                        >
                                            Logout
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Nav.Link href="/login" onClick={handleClose}>Login</Nav.Link>
                                    <Nav.Link href="/register" onClick={handleClose}>Register</Nav.Link>
                                </>
                            )}

                            <Nav.Link href="/about-us" onClick={handleClose}>About Us</Nav.Link>
                            <Nav.Link href="/contact-us" onClick={handleClose}>Contact Us</Nav.Link>

                            {user && (
                                <div className="d-none d-lg-block">
                                    <Button
                                        variant="danger"
                                        onClick={logout}
                                        className="logout-btn-desktop"
                                    >
                                        Logout
                                    </Button>
                                </div>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default NavbarComponent;