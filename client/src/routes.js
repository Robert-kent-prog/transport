// src/routes.js

import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RideCreation from './pages/RideCreation';
import PassengerDashboard from './pages/PassengerDashboard';
import RideSearch from './pages/RideSearch';
import BookingConfirmation from './pages/BookingConfirmation';
import DriverProfile from './pages/DriverProfile';
import RealTimeTracking from './pages/RealTimeTracking';
import Chat from './pages/Chat';

const Router = () => {
    return (
        <Routes> {/* Keep only <Routes> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-ride" element={<RideCreation />} />
            <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
            <Route path="/ride-search" element={<RideSearch />} />
            <Route path="/booking/:rideId" element={<BookingConfirmation />} />
            <Route path="/driver-profile/:driverId" element={<DriverProfile />} />
            <Route path="/real-time-tracking/:rideId" element={<RealTimeTracking />} />
            <Route path="/chat/:driverId" element={<Chat />} />
        </Routes>
    );
};

export default Router;