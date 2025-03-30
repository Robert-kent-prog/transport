import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const credentials = {
                    identifier: values.email, // Backend expects "identifier" instead of "email"
                    password: values.password,
                };

                await login(credentials);
                navigate('/dashboard');
            } catch (error) {
                alert(error.message || 'Login failed. Please check your credentials.');
            }
        },
    });

    return (
        <div className="container mt-5" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h1 className="text-center" style={{ fontSize: '39px', fontWeight: "700" }}>Login</h1>
            <form onSubmit={formik.handleSubmit}>
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
                        onBlur={formik.handleBlur}
                        className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                </div>

                {/* Password Field */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle between text and password
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                        />
                        <span
                            className="input-group-text"
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                            style={{ cursor: 'pointer' }}
                        >
                            {showPassword ? (
                                <i className="bi bi-eye-slash"></i> // Eye-slash icon for hiding
                            ) : (
                                <i className="bi bi-eye"></i> // Eye icon for showing
                            )}
                        </span>
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="invalid-feedback">{formik.errors.password}</div>
                    )}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
            <p className="mt-3 text-center">
                Don't have an account? <a href="/register">Register here</a>
            </p>
        </div>
    );
};

export default Login;