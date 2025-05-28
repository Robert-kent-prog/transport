import React, { useState } from 'react';
import { Form, Button, Dropdown, Row, Col, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './BusBookingPage.css';

const RideBookingForm = () => {
    const navigate = useNavigate(); // Initialize the navigate function

    // State variables for form inputs
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [departureDate, setDepartureDate] = useState(new Date());
    const [isOneWay, setIsOneWay] = useState(true);
    const [error, setError] = useState(''); // State to manage error messages

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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation: Check if both fromLocation and toLocation are selected
        if (!fromLocation || !toLocation) {
            setError('Both "From" and "To" locations are required.');
            return; // Prevent navigation if validation fails
        }

        // Clear any previous error messages
        setError('');

        // console.log({
        //     fromLocation,
        //     toLocation,
        //     departureDate,
        //     isOneWay,
        // });

        // Navigate to the BusBookingPage with query parameters
        navigate('/bus-booking', {
            state: {
                fromLocation,
                toLocation,
                departureDate: departureDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
                isOneWay,
            },
        });
    };

    // Update the return statement to this:
    return (
        <div className="ride-booking-container">
            <h2 className="booking-title">Plan Your Journey</h2>

            {/* Error Message */}
            {error && (
                <Alert variant="danger" className="mb-3">
                    {error}
                </Alert>
            )}

            <Form onSubmit={handleSubmit} className="booking-form">
                {/* Trip Type Toggle */}
                <div className="trip-type-toggle mb-4">
                    <Button
                        variant={isOneWay ? "primary" : "outline-primary"}
                        onClick={() => setIsOneWay(true)}
                        className="me-2"
                    >
                        One Way
                    </Button>
                    <Button
                        variant={!isOneWay ? "primary" : "outline-primary"}
                        onClick={() => setIsOneWay(false)}
                    >
                        Round Trip
                    </Button>
                </div>

                {/* Form Inputs */}
                <Row className="align-items-center mb-3">
                    {/* From Location */}
                    <Col md={3} className="mb-3 mb-md-0">
                        <Form.Label className="form-label">From</Form.Label>
                        <Dropdown onSelect={(value) => setFromLocation(value)}>
                            <Dropdown.Toggle
                                variant="light"
                                id="dropdown-from"
                                className="location-dropdown"
                            >
                                {fromLocation || 'Select location'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="location-menu">
                                {locationOptions.map((option) => (
                                    <Dropdown.Item key={option.value} eventKey={option.value}>
                                        {option.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    {/* To Location */}
                    <Col md={3} className="mb-3 mb-md-0">
                        <Form.Label className="form-label">To</Form.Label>
                        <Dropdown onSelect={(value) => setToLocation(value)}>
                            <Dropdown.Toggle
                                variant="light"
                                id="dropdown-to"
                                className="location-dropdown"
                            >
                                {toLocation || 'Select location'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="location-menu">
                                {locationOptions.map((option) => (
                                    <Dropdown.Item key={option.value} eventKey={option.value}>
                                        {option.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>

                    {/* Departure Date */}
                    <Col md={3} className="mb-3 mb-md-0">
                        <Form.Label className="form-label">Departure</Form.Label>
                        <DatePicker
                            selected={departureDate}
                            onChange={(date) => setDepartureDate(date)}
                            dateFormat="MMMM d, yyyy"
                            className="form-control date-picker"
                            placeholderText="Select date"
                            minDate={new Date()}
                        />
                    </Col>

                    {/* Booking Button */}
                    <Col md={3} className="d-flex justify-content-md-end">
                        <Button variant="primary" type="submit" className="book-button">
                            Search for Vehicles
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default RideBookingForm;