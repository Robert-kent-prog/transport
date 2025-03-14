// src/pages/Login.jsx

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6).required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                await login(values);
                navigate('/dashboard');
            } catch (error) {
                alert('Login failed. Please check your credentials.');
            }
        },
    });

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            {/* Use Bootstrap's form classes */}
            <form onSubmit={formik.handleSubmit}>
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
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
            <p className="mt-3">
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;