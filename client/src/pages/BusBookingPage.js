import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Dropdown, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import './BusBookingPage.css';

const BusBookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { fromLocation: initialFrom, toLocation: initialTo, departureDate } = location.state || {};

    const [fromLocation, setFromLocation] = useState(initialFrom || '');
    const [toLocation, setToLocation] = useState(initialTo || '');
    const [selectedDate, setSelectedDate] = useState(
        departureDate ? new Date(departureDate) : new Date()
    );
    const [tempFromLocation, setTempFromLocation] = useState(initialFrom || '');
    const [tempToLocation, setTempToLocation] = useState(initialTo || '');
    const [busRoutes, setBusRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Add this helper function in BusBookingPage.jsx
    const formatTimeDisplay = (isoDateString) => {
        const date = new Date(isoDateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        });
    };
    // Mock data for location options
    const locationOptions = [
        { value: 'Baringo', label: 'Baringo' },
        { value: 'Bomet', label: 'Bomet' },
        { value: 'Bungoma', label: 'Bungoma' },
        { value: 'Busia', label: 'Busia' },
        { value: 'Elgeyo-Marakwet', label: 'Elgeyo-Marakwet' },
        { value: 'Embu', label: 'Embu' },
        { value: 'Garissa', label: 'Garissa' },
        { value: 'Homa Bay', label: 'Homa Bay' },
        { value: 'Isiolo', label: 'Isiolo' },
        { value: 'Kajiado', label: 'Kajiado' },
        { value: 'Kakamega', label: 'Kakamega' },
        { value: 'Kericho', label: 'Kericho' },
        { value: 'Kiambu', label: 'Kiambu' },
        { value: 'Kilifi', label: 'Kilifi' },
        { value: 'Kirinyaga', label: 'Kirinyaga' },
        { value: 'Kisii', label: 'Kisii' },
        { value: 'Kisumu', label: 'Kisumu' },
        { value: 'Kitui', label: 'Kitui' },
        { value: 'Kwale', label: 'Kwale' },
        { value: 'Laikipia', label: 'Laikipia' },
        { value: 'Lamu', label: 'Lamu' },
        { value: 'Machakos', label: 'Machakos' },
        { value: 'Makueni', label: 'Makueni' },
        { value: 'Mandera', label: 'Mandera' },
        { value: 'Marsabit', label: 'Marsabit' },
        { value: 'Meru', label: 'Meru' },
        { value: 'Migori', label: 'Migori' },
        { value: 'Mombasa', label: 'Mombasa' },
        { value: 'Murang\'a', label: 'Murang\'a' },
        { value: 'Nairobi', label: 'Nairobi' },
        { value: 'Nakuru', label: 'Nakuru' },
        { value: 'Nandi', label: 'Nandi' },
        { value: 'Narok', label: 'Narok' },
        { value: 'Nyamira', label: 'Nyamira' },
        { value: 'Nyandarua', label: 'Nyandarua' },
        { value: 'Nyeri', label: 'Nyeri' },
        { value: 'Samburu', label: 'Samburu' },
        { value: 'Siaya', label: 'Siaya' },
        { value: 'Taita-Taveta', label: 'Taita-Taveta' },
        { value: 'Tana River', label: 'Tana River' },
        { value: 'Tharaka-Nithi', label: 'Tharaka-Nithi' },
        { value: 'Trans Nzoia', label: 'Trans Nzoia' },
        { value: 'Turkana', label: 'Turkana' },
        { value: 'Uasin Gishu', label: 'Uasin Gishu' },
        { value: 'Vihiga', label: 'Vihiga' },
        { value: 'Wajir', label: 'Wajir' },
        { value: 'West Pokot', label: 'West Pokot' }
    ];

    useEffect(() => {
        const fetchData = async () => {
            if (!fromLocation || !toLocation || !selectedDate) {
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const formattedDate = selectedDate.toISOString().split('T')[0];
                const response = await fetch(
                    `http://192.168.100.175:5000/api/rides/all?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}&date=${formattedDate}`
                );

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Fetched rides:', data);
                setBusRoutes(data);
            } catch (error) {
                console.error('Error fetching rides:', error);
                setError('Failed to fetch rides. Please try again.');
                setBusRoutes([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [fromLocation, toLocation, selectedDate]);

    const handleLocationChange = () => {
        setFromLocation(tempFromLocation);
        setToLocation(tempToLocation);
        navigate('/bus-booking', {
            state: {
                fromLocation: tempFromLocation,
                toLocation: tempToLocation,
                departureDate: selectedDate.toISOString().split('T')[0],
            },
        });
    };

    // Handle "BookOnPay" button
    const handleBookOnPay = (rideId, ridePrice, fromLocation, toLocation) => {
        navigate(`/payment-options/${rideId}/${ridePrice}`, {
            state: {
                fromLocation: fromLocation,
                toLocation: toLocation,
                departureDate: selectedDate.toISOString().split('T')[0]
            }
        });
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '2000px', margin: '0 auto' }}>
            {/* Header */}
            <header className="bg-dark text-white p-3">
                <Row>
                    <Col xs={3}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                            {fromLocation || 'Select Location'} → {toLocation || 'Select Location'}
                        </span>
                        <small
                            className="d-block mt-1"
                            style={{ color: '#888', fontSize: '0.9rem' }}
                        >
                            {selectedDate instanceof Date ? selectedDate.toLocaleDateString() : "Invalid Date"}
                        </small>
                    </Col>
                    <Col xs={6} className="d-flex justify-content-end align-items-center">
                        <Dropdown onSelect={(value) => setTempFromLocation(value)} className="me-2">
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                id="dropdown-basic"
                                className="custom-dropdown"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    borderColor: '#ced4da',
                                    color: '#333',
                                    width: '200px',
                                    textAlign: 'left',
                                }}
                            >
                                {tempFromLocation || 'Select...'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="custom-dropdown-menu">
                                {locationOptions.map((option) => (
                                    <Dropdown.Item key={option.value} eventKey={option.value}>
                                        {option.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown onSelect={(value) => setTempToLocation(value)} className="me-2">
                            <Dropdown.Toggle
                                variant="outline-secondary"
                                id="dropdown-basic"
                                className="custom-dropdown"
                                style={{
                                    backgroundColor: '#f8f9fa',
                                    borderColor: '#ced4da',
                                    color: '#333',
                                    width: '200px',
                                    textAlign: 'left',
                                }}
                            >
                                {tempToLocation || 'Select...'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="custom-dropdown-menu">
                                {locationOptions.map((option) => (
                                    <Dropdown.Item key={option.value} eventKey={option.value}>
                                        {option.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div style={{ width: '200px' }} className="me-2">
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="form-control custom-datepicker"
                                placeholderText="Select date"
                                minDate={new Date()}
                            />
                        </div>
                        <Button
                            variant="danger"
                            className="custom-button"
                            onClick={handleLocationChange}
                        >
                            MAKE A BOOKING
                        </Button>
                    </Col>
                </Row>
            </header>

            {/* Main Content */}
            <Container className="mt-5">
                <h2 className="text-center mb-4">{fromLocation || 'Select Location'} → {toLocation || 'Select Location'}</h2>

                {error && <p className="text-danger">{error}</p>}

                {loading ? (
                    <p>Loading...</p>
                ) : busRoutes.length > 0 ? (
                    <Table striped bordered hover responsive className="table-responsive-md">
                        <thead>
                            <tr>
                                <th>Departs</th>
                                <th>Departure Time</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {busRoutes.map((route, index) => (
                                <tr key={index}>
                                    <td>
                                        <img
                                            src={route.companyLogo}
                                            alt="Company Logo"
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    </td>
                                    <td>
                                        <p className="mb-0">
                                            <span className="text-primary">{fromLocation}</span>{' '}
                                            <span className="text-primary mx-2">→</span>{' '}
                                            <span className="text-primary">{toLocation}</span>
                                        </p>
                                        {formatTimeDisplay(route.departureTime)}
                                        <br />
                                        <small className="text-success">
                                            {route.availableSeats} Available seats
                                        </small>
                                    </td>
                                    <td>
                                        <p className="mb-0">KSHS {route.ridePrice}</p>
                                        {/* BookOnPay button */}
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleBookOnPay(route._id, route.ridePrice, fromLocation, toLocation, departureDate)}
                                        >
                                            BookOnPay
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <>
                        <h1 className="text-center fw-bold fs-3" >No rides available</h1>
                        <p>Sorry! We couldn't find any vehicles matching your search. Please change the date or search for an alternative route.</p>
                    </>
                )}
            </Container>
        </Container>
    );
};

export default BusBookingPage;