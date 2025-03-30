import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./PaymentOption.css";

const PaymentOptions = () => {
    const { rideId, ridePrice } = useParams(); // Extract ride ID and price from URL

    // State for user input
    const [mpesaNumber, setMpesaNumber] = useState("");
    const [showStkModal, setShowStkModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("mpesa");

    // Debugging statement to check ridePrice
    console.log("Ride Price:", ridePrice);

    // Function to handle sending payment request
    const handleSendPaymentRequest = () => {
        if (!mpesaNumber.trim()) {
            alert("Please enter your M-PESA number.");
            return;
        }
        setShowStkModal(true); // Show the STK push modal
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setShowStkModal(false);
    };

    // Function to handle payment method change
    const handlePaymentMethodChange = (e) => {
        const selectedMethod = e.target.value;
        setSelectedPaymentMethod(selectedMethod);

        // if (selectedMethod !== "mpesa") {
        //     alert("Payment is not available at this time for this method.");
        // }
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

            {/* Payment Card */}
            <div className="row justify-content-flexstart">
                <div className="col-md-6">
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
                                    <option value="bank-transfer">Bank Transfer</option>
                                    <option value="paypal">PayPal</option>
                                    <option value="card">MasterCard, Visa, ATM, Debit & Credit</option>
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
                                        onChange={(e) => setMpesaNumber(e.target.value)}
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
                                    <span className="text-danger">{ridePrice} KES</span> {/* Dynamic amount */}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulated STK Push Modal */}
            <div
                className={`modal fade ${showStkModal ? "show d-block" : ""}`}
                tabIndex="-1"
                style={{ display: showStkModal ? "block" : "none", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">M-PESA Payment</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCloseModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <strong>Business No:</strong> 4123955
                            </p>
                            <p>
                                <strong>Account No:</strong> 472379
                            </p>
                            <p>
                                <strong>Amount:</strong> {ridePrice} KES {/* Dynamic amount */}
                            </p>
                            <p>
                                Please confirm the payment on your phone. Check your M-PESA app for the
                                STK push.
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={handleCloseModal}
                            >
                                Confirm Payment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentOptions;