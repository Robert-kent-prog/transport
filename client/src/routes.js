// src/routes.js

import { Routes, Route } from 'react-router-dom'; // Remove BrowserRouter import
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import RideCreation from './pages/RideCreation';
import PassengerDashboard from './pages/PassengerDashboard';
import BookingConfirmation from './pages/BookingConfirmation';
import DriverProfile from './pages/DriverProfile';
import RealTimeTracking from './pages/RealTimeTracking';
import Chat from './pages/Chat';
import AboutUs from './pages/AboutPage';
import ContactUs from './pages/ContactPage';
import PaymentOptions from './pages/PaymentOptions';
import BusBookingPage from './pages/BusBookingPage';

const Router = () => {
    return (
        <Routes> {/* Keep only <Routes> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-ride" element={<RideCreation />} />
            <Route path="/bus-booking" element={<BusBookingPage />} />
            <Route path="/passenger-dashboard" element={<PassengerDashboard />} />
            <Route path="/payment-options/:rideId/:ridePrice" element={<PaymentOptions />} />
            <Route path="/driver-profile/:rideId" element={<DriverProfile />} />
            <Route path="/booking/:rideId" element={<BookingConfirmation />} />
            <Route path="/real-time-tracking/:rideId" element={<RealTimeTracking />} />
            <Route path="/chat/:driverId" element={<Chat />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
    );
};

export default Router;