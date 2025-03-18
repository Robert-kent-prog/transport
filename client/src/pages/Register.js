// src/pages/Register.jsx
import axios from 'axios'; // Import axios for API calls
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();

    // State to track the selected role
    const [role, setRole] = useState('passenger'); // Default role is "passenger"

    // Formik configuration
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            carMake: '',
            carModel: '',
            licensePlate: '',
            seatingCapacity: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Required'),
            password: Yup.string().min(6).required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required'),
            ...(role === 'driver' && {
                carMake: Yup.string().required('Required'),
                carModel: Yup.string().required('Required'),
                licensePlate: Yup.string().required('Required'),
                seatingCapacity: Yup.number().positive().integer().required('Required'),
            }),
        }),
        onSubmit: async (values) => {
            try {
                // Prepare the payload
                const payload = {
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    password: values.password,
                    confirmPassword: values.confirmPassword,
                    role: role, // Use the selected role
                    ...(role === 'driver' && {
                        carDetails: {
                            make: values.carMake,
                            model: values.carModel,
                            licensePlate: values.licensePlate,
                            seatingCapacity: parseInt(values.seatingCapacity, 10),
                        },
                    }),
                };

                // Send the registration request to the backend
                const response = await axios.post('http://20.0.161.221:5000/api/auth/register', payload);

                // Handle successful registration
                console.log(response.data);
                alert('Registration successful!');
                navigate('/login'); // Redirect to login after registration
            } catch (error) {
                // Handle registration errors
                console.error('Error during registration:', error.response?.data || error.message);
                alert('Registration failed. Please check your details and try again.');
            }
        },
    });
    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={formik.handleSubmit}>
                {/* Name Field */}
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className="invalid-feedback">{formik.errors.name}</div>
                    ) : null}
                </div>

                {/* Email Field */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    ) : null}
                </div>

                {/* Phone Field */}
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                        Phone
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="invalid-feedback">{formik.errors.phone}</div>
                    ) : null}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    ) : null}
                </div>

                {/* Confirm Password Field */}
                <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className="invalid-feedback">{formik.errors.confirmPassword}</div>
                    ) : null}
                </div>

                {/* Role Selection Dropdown */}
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                        Role
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => {
                            setRole(e.target.value); // Update role state
                            formik.setFieldValue('role', e.target.value); // Update Formik field
                        }}
                        className="form-select"
                    >
                        <option value="passenger">Passenger</option>
                        <option value="driver">Driver</option>
                    </select>
                </div>

                {/* Car Details Fields (for drivers only) */}
                {role === 'driver' && (
                    <>
                        {/* Car Make */}
                        <div className="mb-3">
                            <label htmlFor="carMake" className="form-label">
                                Car Make
                            </label>
                            <input
                                type="text"
                                id="carMake"
                                name="carMake"
                                value={formik.values.carMake}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.touched.carMake && formik.errors.carMake ? 'is-invalid' : ''}`}
                            />
                            {formik.touched.carMake && formik.errors.carMake ? (
                                <div className="invalid-feedback">{formik.errors.carMake}</div>
                            ) : null}
                        </div>

                        {/* Car Model */}
                        <div className="mb-3">
                            <label htmlFor="carModel" className="form-label">
                                Car Model
                            </label>
                            <input
                                type="text"
                                id="carModel"
                                name="carModel"
                                value={formik.values.carModel}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.touched.carModel && formik.errors.carModel ? 'is-invalid' : ''}`}
                            />
                            {formik.touched.carModel && formik.errors.carModel ? (
                                <div className="invalid-feedback">{formik.errors.carModel}</div>
                            ) : null}
                        </div>

                        {/* License Plate */}
                        <div className="mb-3">
                            <label htmlFor="licensePlate" className="form-label">
                                License Plate
                            </label>
                            <input
                                type="text"
                                id="licensePlate"
                                name="licensePlate"
                                value={formik.values.licensePlate}
                                onChange={formik.handleChange}
                                className={`form-control ${formik.touched.licensePlate && formik.errors.licensePlate ? 'is-invalid' : ''}`}
                            />
                            {formik.touched.licensePlate && formik.errors.licensePlate ? (
                                <div className="invalid-feedback">{formik.errors.licensePlate}</div>
                            ) : null}
                        </div>

                        {/* Seating Capacity */}
                        <div className="mb-3">
                            <label htmlFor="seatingCapacity" className="form-label">
                                Seating Capacity
                            </label>
                            <input
                                type="number"
                                id="seatingCapacity"
                                name="seatingCapacity"
                                value={formik.values.seatingCapacity}
                                onChange={formik.handleChange}
                                min="1"
                                className={`form-control ${formik.touched.seatingCapacity && formik.errors.seatingCapacity ? 'is-invalid' : ''}`}
                            />
                            {formik.touched.seatingCapacity && formik.errors.seatingCapacity ? (
                                <div className="invalid-feedback">{formik.errors.seatingCapacity}</div>
                            ) : null}
                        </div>
                    </>
                )}

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>

            {/* Already have an account? Login */}
            <p className="mt-3 text-left">
                Already have an account?{' '}
                <a href="/login" className="text-primary">
                    Login here
                </a>
            </p>
        </div>
    );
};

export default Register;