// src/pages/Register.jsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Register = ({ role }) => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            ...(role === 'driver' && {
                carMake: '',
                carModel: '',
                licensePlate: '',
                seatingCapacity: '',
            }),
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
                // Simulate registration logic
                console.log(values);
                alert('Registration successful!');
                navigate('/login');
            } catch (error) {
                alert('Registration failed. Please try again.');
            }
        },
    });

    return (
        <div className="container mt-5">
            <h2>{role === 'driver' ? 'Driver Registration' : 'Passenger Registration'}</h2>
            {/* Use Bootstrap's form classes */}
            <form onSubmit={formik.handleSubmit}>
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
                {role === 'driver' && (
                    <>
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
                        {/* Add fields for car model, license plate, seating capacity */}
                    </>
                )}
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;