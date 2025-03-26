import React from 'react';
import { useParams, Link } from 'react-router-dom';

const PaymentOptions = () => {
    const { rideId } = useParams(); // Extract ride ID from URL

    return (
        <div className="container mt-5">
            <h2>Payment Options</h2>
            <p>Select a payment method to proceed with booking ride ID: {rideId}</p>

            {/* Payment Methods */}
            <div className="list-group">
                <button className="list-group-item list-group-item-action">Pay with Credit Card</button>
                <button className="list-group-item list-group-item-action">Pay with PayPal</button>
                <button className="list-group-item list-group-item-action">Pay with Mobile Money</button>
            </div>

            {/* View Driver Profile Button */}
            <div className="mt-4">
                <Link
                    to={`/driver-profile/${rideId}`} // Navigate to driver profile page
                    className="btn btn-primary"
                >
                    View Driver Profile
                </Link>
            </div>
        </div>
    );
};

export default PaymentOptions;