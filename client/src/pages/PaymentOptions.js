import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PaymentOption.css";
import axios from "axios";

const PaymentOptions = () => {
    const { rideId, ridePrice } = useParams(); // Extract ride ID and price from URL
    const [mpesaNumber, setMpesaNumber] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mpesa");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false); // Confirmation modal state
    const [showProcessingModal, setShowProcessingModal] = useState(false); // Processing modal state

    // Function to handle payment method change
    const handlePaymentMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setSelectedPaymentMethod(selectedMethod);

        if (selectedMethod !== "mpesa") {
            alert("Payment is not available at this time for this method.");
        }
    };

    // Function to sanitize and validate phone input
    const textInputChange = (val) => {
        // Remove non-numeric characters and limit to 10 digits
        const sanitizedInput = val.replace(/[^0-9]/g, "").slice(0, 10);
        setMpesaNumber(sanitizedInput); // Update the M-PESA number state
    };

    // Function to handle sending payment request
    const handleSendPaymentRequest = async () => {
        // Validate M-PESA number
        if (!mpesaNumber.trim() || mpesaNumber.length !== 10) {
            alert("Please enter a valid 10-digit M-PESA number.");
            return;
        }

        // Show confirmation modal
        setShowConfirmationModal(true);

        // Clear the M-PESA number field after initiating the process
    };

    // Function to handle confirmation modal actions
    const handleConfirmation = (confirm) => {
        setShowConfirmationModal(false); // Close confirmation modal

        if (confirm) {
            // Proceed with payment request
            initiatePayment();
        }
    };

    // Function to initiate payment
    const initiatePayment = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found in localStorage');
            return;
        }

        // Prepare the request body
        const requestData = {
            amount: ridePrice, // Send ridePrice as the amount
            phone: mpesaNumber, // Send the entered M-PESA number
        };

        try {
            // Show processing modal
            setShowProcessingModal(true);

            // Send POST request to the backend
            const response = await axios.post("http://20.0.183.85:5000/api/stkpush", requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, // Include the access token in the headers
                },
            });

            setMpesaNumber(""); // Clear the input field
            console.log("Payment request successful:", response.data);

            // Keep the processing modal open to show success message
        } catch (error) {
            console.error("Error initiating payment:", error.response ? error.response.data : error.message);

            // Hide processing modal and display an error message
            setShowProcessingModal(false);
            alert("Failed to initiate payment. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            {/* Ride ID and View Driver Profile Section */}
            <div className="mb-4">
                <h2>Payment for Ride ID: {rideId}</h2>
                <p>
                    Select a payment method to proceed with booking ride ID:{" "}
                    <strong>{rideId}</strong>
                </p>

                {/* View Driver Profile Button */}
                <Link
                    to={`/driver-profile/${rideId}`} // Navigate to driver profile page
                    className="btn btn-primary"
                >
                    View Driver Profile
                </Link>
            </div>

            {/* New Booking Submission Section */}
            <div className="row justify-content-flexstart">
                <div className="col-md-8 mb-4"> {/* Increased column width from col-md-6 to col-md-8 */}
                    {/* Card Container */}
                    <div
                        className="card booking-card rounded shadow-lg"
                        style={{
                            border: '2px solid #007bff', // Blue border
                            backgroundColor: '#007bff', // Blue background
                            color: '#ffffff',          // White text
                            padding: '2rem',           // Add padding for spacing
                            borderRadius: '10px',      // Rounded corners for a polished look
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                        }}
                    >
                        <div className="card-body">
                            {/* Title Section */}
                            <h3 className="mb-3 text-center text-white" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                📝 Booking Submission
                            </h3>

                            {/* Cancellation Notice */}
                            <p className="text-center mb-4" style={{ fontSize: '0.9rem' }}>
                                Need to Cancel or Change your ticket?{' '}
                                <a href="mailto:cancellation@easycoachkenya.com" className="text-white fw-bold">
                                    Email our Team: cancellation@easycoachkenya.com
                                </a>
                            </p>

                            {/* Form Section */}
                            <form>
                                {/* First Name and Last Name */}
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="firstName" className="form-label" style={{ color: '#ffffff' }}>
                                            First Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="firstName"
                                            placeholder="First name"
                                            required
                                            style={{ backgroundColor: '#cce5ff', borderColor: '#b8daff', color: '#000000' }} // Light blue input background
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName" className="form-label" style={{ color: '#ffffff' }}>
                                            Last Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="lastName"
                                            placeholder="Last name"
                                            required
                                            style={{ backgroundColor: '#cce5ff', borderColor: '#b8daff', color: '#000000' }} // Light blue input background
                                        />
                                    </div>
                                </div>

                                {/* ID/Passport and Residence */}
                                <div className="row g-3 mt-3">
                                    <div className="col-md-6">
                                        <label htmlFor="idPassport" className="form-label" style={{ color: '#ffffff' }}>
                                            ID/Passport <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="idPassport"
                                            placeholder="ID No or Passport"
                                            required
                                            style={{ backgroundColor: '#cce5ff', borderColor: '#b8daff', color: '#000000' }} // Light blue input background
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="residence" className="form-label" style={{ color: '#ffffff' }}>
                                            Residence <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="residence"
                                            placeholder="Nairobi"
                                            value="Nairobi"
                                            disabled
                                            style={{ backgroundColor: '#cce5ff', borderColor: '#b8daff', color: '#000000' }} // Light blue input background
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div className="mt-3">
                                    <label htmlFor="phone" className="form-label" style={{ color: '#ffffff' }}>
                                        Passenger Phone Number <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        className="form-control form-control-sm"
                                        id="phone"
                                        placeholder="e.g. 0722000000"
                                        required
                                        style={{ backgroundColor: '#cce5ff', borderColor: '#b8daff', color: '#000000' }} // Light blue input background
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Payment Card */}
            <div className="row justify-content-flexend">
                <div className="col-md-8">
                    <div className="card payment-card text-white rounded">
                        <div className="card-body">
                            {/* Total Due */}
                            <div className="mb-3">
                                <h5>Total Due</h5>
                                <h3>Ksh {ridePrice}</h3> {/* Display ridePrice */}
                            </div>

                            {/* Payment Method Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="paymentMethod" className="form-label">
                                    Payment Method:
                                </label>
                                <select
                                    className="form-select rounded"
                                    id="paymentMethod"
                                    value={selectedPaymentMethod}
                                    onChange={handlePaymentMethodChange} // Handle selection change
                                >
                                    <option value="mpesa">Pay via M-Pesa</option>
                                </select>
                            </div>

                            {/* M-Pesa Number Input */}
                            {selectedPaymentMethod === "mpesa" && (
                                <div className="mb-3">
                                    <label htmlFor="mpesaNumber" className="form-label">
                                        Enter your M-PESA number below to receive a prompt on your phone
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control rounded"
                                        id="mpesaNumber"
                                        placeholder="e.g 254700000000"
                                        value={mpesaNumber}
                                        onChange={(e) => textInputChange(e.target.value)} // Use sanitization function
                                    />
                                </div>
                            )}

                            {/* Send Payment Request Button */}
                            {selectedPaymentMethod === "mpesa" && (
                                <button
                                    className="btn btn-light w-100 mb-3 rounded"
                                    onClick={handleSendPaymentRequest}
                                >
                                    Send payment request
                                </button>
                            )}

                            {/* Static Fields */}
                            <div>
                                <p>
                                    <strong>Enter business no:</strong>{" "}
                                    <span className="text-danger">4123955</span>
                                </p>
                                <p>
                                    <strong>Enter account no:</strong>{" "}
                                    <span className="text-danger">472379</span>
                                </p>
                                <p>
                                    <strong>Enter amount:</strong>{" "}
                                    <span className="text-danger">Ksh {ridePrice}</span> {/* Dynamic amount */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            <div
                className={`modal fade ${showConfirmationModal ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{ display: showConfirmationModal ? "block" : "none", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Confirm Ride Booking</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowConfirmationModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>Please confirm ride booking for this amount Ksh {ridePrice}</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowConfirmationModal(false)}
                            >
                                No
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => handleConfirmation(true)}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Processing Modal */}
            <div
                className={`modal fade ${showProcessingModal ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{ display: showProcessingModal ? "block" : "none", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">Complete Booking</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={() => setShowProcessingModal(false)}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <strong>Do you wish to Book a Ride @{ridePrice}/-? </strong>
                            </p>
                            <p>
                                You will receive a Mpesa Prompt requesting a payment of Ksh. {ridePrice} on the phone
                                number {mpesaNumber}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowProcessingModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => setShowProcessingModal(false)}
                            >
                                Waiting...
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentOptions;