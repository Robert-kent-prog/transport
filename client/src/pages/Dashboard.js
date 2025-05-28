import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
    const [rides, setRides] = useState([]); // State to store fetched rides
    const [rideStatuses, setRideStatuses] = useState({}); // State to manage ride statuses locally
    const [selectedRide, setSelectedRide] = useState(null); // State to track the selected ride for updates
    const [modalOpen, setModalOpen] = useState(false); // State to control the modal visibility
    const [updatedSeats, setUpdatedSeats] = useState(0); // State to track updated seats
    const [updatedStatus, setUpdatedStatus] = useState(''); // State to track updated status

    // Fetch rides from the backend when the component mounts
    useEffect(() => {
        const fetchRides = async () => {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                console.error('No access token found in localStorage');
                alert('You are not authenticated. Please log in.');
                return;
            }

            try {
                const response = await axios.get('http://192.168.100.175:5000/api/rides/all', {
                    headers: { Authorization: `Bearer ${accessToken}` },
                });

                const initialStatuses = {};
                response.data.forEach((ride) => {
                    initialStatuses[ride._id] = ride.status || 'Active'; // Default to 'Active' if no status exists
                });
                setRideStatuses(initialStatuses);
                setRides(response.data);
            } catch (error) {
                console.error('Error fetching rides:', error.response?.data || error.message);
                alert('Failed to fetch rides. Please try again.');
            }
        };

        fetchRides();
    }, []);

    // Handle opening the modal
    const openModal = (ride) => {
        setSelectedRide(ride);
        setUpdatedSeats(ride.availableSeats); // Initialize seats with current value
        setUpdatedStatus(rideStatuses[ride._id]); // Initialize status with current value
        setModalOpen(true); // Open the modal
    };

    // Handle closing the modal
    const closeModal = () => {
        setSelectedRide(null);
        setUpdatedSeats(0);
        setUpdatedStatus('');
        setModalOpen(false); // Close the modal
    };

    // Handle updating ride details on the backend
    const handleSaveChanges = async () => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            alert('You are not authenticated. Please log in.');
            return;
        }

        try {
            await axios.put(
                `http://192.168.100.175:5000/api/rides/update/${selectedRide._id}`,
                { status: updatedStatus, availableSeats: updatedSeats },
                { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            alert('Ride details updated successfully.');
            window.location.reload(); // Refresh the page to reflect changes
        } catch (error) {
            console.error('Error updating ride details:', error.response?.data || error.message);
            alert('Failed to update ride details. Please try again.');
        }
    };

    // Handle deleting a ride from the backend
    const handleDeleteRide = async (rideId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this ride?');
        if (!isConfirmed) return;

        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            alert('You are not authenticated. Please log in.');
            return;
        }

        try {
            await axios.delete(`http://192.168.100.175:5000/api/rides/delete/${rideId}`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            alert('Ride deleted successfully.');
            window.location.reload(); // Refresh the page to reflect changes
        } catch (error) {
            console.error('Error deleting ride:', error.response?.data || error.message);
            alert('Failed to delete ride. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Driver Dashboard</h2>
            {/* Use Bootstrap's table classes */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Destination</th>
                        <th>Dept. Time</th>
                        <th>Dept. Date</th>
                        <th>Seats</th>
                        <th>Amount</th> {/* Added Amount column */}
                        <th>Ride Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rides.map((ride) => (
                        <tr key={ride._id}>
                            <td>{ride._id}</td>
                            <td>{ride.pickupLocation}</td>
                            <td>{ride.dropoffLocation}</td>
                            <td>{new Date(ride.departureTime).toLocaleTimeString()}</td>
                            <td>{new Date(ride.departureDate).toLocaleDateString()}</td>
                            <td>{ride.availableSeats}</td>
                            <td>{ride.ridePrice || 'N/A'}</td> {/* Display amount or fallback to 'N/A' */}
                            <td>{rideStatuses[ride._id]}</td>
                            <td>
                                {/* Buttons in the same line */}
                                <button
                                    className="btn btn-success me-2" // Add margin-end for spacing
                                    onClick={() => openModal(ride)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteRide(ride._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {modalOpen && selectedRide && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Update Ride Details</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Available Seats</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={updatedSeats}
                                        onChange={(e) => setUpdatedSeats(parseInt(e.target.value, 10))}
                                        min="1"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ride Status</label>
                                    <select
                                        className="form-select"
                                        value={updatedStatus}
                                        onChange={(e) => setUpdatedStatus(e.target.value)}
                                    >
                                        <option value="active">Active</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSaveChanges}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DriverDashboard;