import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./PaymentOption.css";
import axios from "axios";

const PaymentOptions = () => {
    const { ridePrice } = useParams(); // Only keep ridePrice since rideId isn't used
    const [mpesaNumber, setMpesaNumber] = useState("");
    const routelocation = useLocation(); // Get access to location state
    const { fromLocation, toLocation, departureDate } = routelocation.state || {}; // Get locations from state
    const [phoneNumber, setPhoneNumber] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [idPassport, setIdPassport] = useState("");
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showProcessingModal, setShowProcessingModal] = useState(false);

    console.log('Ride Price:', ridePrice, 'From Location:', fromLocation, 'To Location:', toLocation, 'Selected Date:', departureDate);

    const textInputChange = (val, isMpesa = false) => {
        const sanitizedInput = val.replace(/[^0-9]/g, "").slice(0, 10);
        if (isMpesa) {
            setMpesaNumber(sanitizedInput);
        } else {
            setPhoneNumber(sanitizedInput);
        }
    };

    const handleSendPaymentRequest = async (e) => {
        e.preventDefault();
        if (!mpesaNumber.trim() || mpesaNumber.length !== 10) {
            alert("Please enter a valid 9-digit M-PESA number (without country code).");
            return;
        }
        if (!phoneNumber.trim() || phoneNumber.length !== 10) {
            alert("Please enter a valid 9-digit phone number (without country code).");
            return;
        }
        setShowConfirmationModal(true);
    };

    const handleConfirmation = (confirm) => {
        setShowConfirmationModal(false);
        if (confirm) {
            initiatePayment();
        }
    };

    const initiatePayment = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            console.error('No access token found in localStorage');
            return;
        }
        const requestData = {
            amount: ridePrice,
            phone: `254${mpesaNumber}`,
        };
        try {
            setShowProcessingModal(true);
            await axios.post("http://192.168.100.16:5000/api/stkpush", requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setMpesaNumber("");
            console.log("Payment request successful");
        } catch (error) {
            console.error("Error initiating payment:", error.response ? error.response.data : error.message);
            setShowProcessingModal(false);
            alert("Failed to initiate payment. Please try again later.");
        }
    };

    return (
        <div className="container py-5" style={{ marginTop: '30px' }}>
            <div className="row">
                {/* Left Section: Booking Form */}
                <div className="col-lg-7 pe-lg-5">
                    {/* Booking Submission Card */}
                    <div className="card border-0 shadow-sm mb-4">
                        <div className="card-body p-4">
                            <h2 className="mb-4 fw-bold text-primary">Booking Submission</h2>
                            <div className="alert alert-info">
                                Need to Cancel or Change your ticket?{' '}
                                Email our Team:
                                <button className="btn btn-link p-0 align-baseline"
                                    onClick={() => window.location.href = "mailto:cancellation@rideshare.com"}>
                                    cancellation@rideshare.com
                                </button>
                            </div>

                            <form onSubmit={handleSendPaymentRequest}>
                                <h5 className="mt-4 mb-3 fw-bold border-bottom pb-2">Passenger Details</h5>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="firstName" className="form-label">First Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            placeholder="First name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="lastName" className="form-label">Last Name <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            placeholder="Last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="row g-3 mt-1">
                                    <div className="col-md-6">
                                        <label htmlFor="idPassport" className="form-label">ID/Passport <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="idPassport"
                                            placeholder="ID No or Passport"
                                            value={idPassport}
                                            onChange={(e) => setIdPassport(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="residence" className="form-label">Residence <span className="text-danger">*</span></label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="residence"
                                            placeholder="Nairobi"
                                            value={fromLocation || "Nairobi"}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="mt-3">
                                    <label htmlFor="phoneNumber" className="form-label">Passenger Phone Number <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <span className="input-group-text">+254</span>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="phoneNumber"
                                            placeholder="e.g. 700000000"
                                            value={phoneNumber}
                                            onChange={(e) => textInputChange(e.target.value)}
                                            maxLength="10"
                                            required
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Payment Information Card */}
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="mb-4 fw-bold text-primary">Payment Information</h2>
                            <div className="mb-3">
                                <label htmlFor="mpesaNumber" className="form-label">Safaricom M-Pesa Number <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text">+254</span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="mpesaNumber"
                                        placeholder="e.g. 700000000"
                                        value={mpesaNumber}
                                        onChange={(e) => textInputChange(e.target.value, true)}
                                        maxLength="10"
                                        required
                                    />
                                </div>
                                <small className="text-muted">Your SMS will be sent to this number</small>
                            </div>

                            <div className="alert alert-warning mt-4">
                                <strong>Please Note:</strong> Once seats are selected and paid for, they cannot be changed. Tickets are non-refundable.
                            </div>

                            <div className="form-check mt-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="termsCheckbox"
                                    required
                                />
                                <label className="form-check-label" htmlFor="termsCheckbox">
                                    I agree to the <button className="btn btn-link p-0 align-baseline" onClick={() => { }}>Terms and Conditions</button> and <button className="btn btn-link p-0 align-baseline" onClick={() => { }}>Privacy Policy</button>
                                </label>
                            </div>

                            <button
                                className="btn btn-primary btn-lg w-100 mt-4 py-3 fw-bold"
                                type="submit"
                                onClick={handleSendPaymentRequest}
                                form="paymentForm"
                            >
                                <i className="fas fa-mobile-alt me-2"></i> Pay Ksh {ridePrice} with M-Pesa
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Section: Booking Summary */}
                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="mb-4 fw-bold text-primary">Your Booking</h2>
                            <div className="text-center mb-4">
                                <img src="../images/bus.jpeg" alt="Bus" className="img-fluid rounded" />
                            </div>

                            <h5 className="fw-bold">{fromLocation} - {toLocation} </h5>
                            <ul className="list-unstyled mb-4">
                                <li className="mb-2"><i className="fas fa-clock text-primary me-2"></i> Departure: <strong>21:00 PM (night)</strong></li>
                                <li><i className="fas fa-clock text-primary me-2"></i> Arrival: <strong>5:30 AM (night)</strong></li>
                            </ul>

                            <h5 className="fw-bold border-top pt-3">Order Details</h5>
                            <ul className="list-unstyled">
                                <li className="d-flex justify-content-between mb-2">
                                    <span>Passenger(s):</span>
                                    <span className="fw-bold">1</span>
                                </li>
                                <li className="d-flex justify-content-between mb-2">
                                    <span>Base Fare:</span>
                                    <span className="fw-bold">Ksh {ridePrice}</span>
                                </li>
                                <li className="d-flex justify-content-between mb-2">
                                    <span>Service Fee:</span>
                                    <span className="fw-bold">Ksh 0</span>
                                </li>
                                <li className="d-flex justify-content-between border-top pt-2 mt-2">
                                    <span className="fw-bold">Total Price:</span>
                                    <span className="fw-bold text-primary fs-5">Ksh {ridePrice}</span>
                                </li>
                            </ul>

                            <div className="alert alert-success mt-4">
                                <i className="fas fa-info-circle me-2"></i>
                                Your booking will be confirmed once payment is received.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmationModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Confirm Ride Booking</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowConfirmationModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Please confirm ride booking for this amount:</p>
                                <h4 className="text-center my-3">Ksh {ridePrice}</h4>
                                <p className="text-muted">You will receive an M-Pesa prompt on +254{mpesaNumber} shortly.</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowConfirmationModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={() => handleConfirmation(true)}>
                                    Confirm Payment
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Processing Modal */}
            {showProcessingModal && (
                <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Complete Booking</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={() => setShowProcessingModal(false)}></button>
                            </div>
                            <div className="modal-body text-center">
                                <div className="spinner-border text-primary mb-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <h5 className="mb-3">Processing Your Payment</h5>
                                <p>
                                    <strong>Booking amount: Ksh {ridePrice}</strong>
                                </p>
                                <p>
                                    You will receive a M-Pesa prompt on <strong>+254{mpesaNumber}</strong>
                                </p>
                                <div className="alert alert-info mt-3">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Please check your phone and enter your M-Pesa PIN when prompted.
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowProcessingModal(false)}>
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaymentOptions;