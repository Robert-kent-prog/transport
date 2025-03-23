import React, { useState } from 'react';
import './Contact.css'

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simulate sending data to a backend API
            console.log('Form Data Submitted:', formData);
            alert('Thank you for contacting us! We will get back to you soon.');
            setFormData({ name: '', email: '', message: '' }); // Reset form
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit your message. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Title */}
                    <h1 className="text-center mb-4">Contact Us</h1>
                    <p className="lead text-center mb-5">
                        We’d love to hear from you! Whether you have questions, feedback, or suggestions, our team is here to assist you.
                    </p>

                    {/* Section 1: Contact Details */}
                    <h2 className="text-start">Get in Touch</h2>
                    <div className="text-center mb-5">
                        <p><strong>Email:</strong> support@rideshare.com</p>
                        <p><strong>Phone:</strong> +123 456 7890</p>
                        <p><strong>Address:</strong> 123 RideShare Lane, Cityville, Country</p>
                    </div>

                    {/* Section 2: FAQs */}
                    <h2 className="text-start">Frequently Asked Questions</h2>
                    <div className="accordion" id="faqAccordion">
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingOne">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                    How do I book a ride?
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Simply sign up as a passenger, search for available rides, and book your seat. You’ll receive confirmation once the driver accepts your request.
                                </div>
                            </div>
                        </div>
                        <div className="accordion-item">
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    How do I become a driver?
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                <div className="accordion-body">
                                    Sign up as a driver, upload your car details, and list your available rides. Passengers will book seats based on your schedule.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Contact Form */}
                    <h2 className="text-start mt-5">Send Us a Message</h2>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;