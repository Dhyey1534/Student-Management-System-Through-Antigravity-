import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';

const initialFormState = {
    firstName: '',
    lastName: '',
    email: '',
    course: '',
    phoneNumber: '',
};

const AddStudent = () => {
    const [form, setForm] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};
        if (!form.firstName.trim()) newErrors.firstName = 'First name is required.';
        if (!form.lastName.trim()) newErrors.lastName = 'Last name is required.';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Please enter a valid email address.';
        }
        if (!form.course.trim()) newErrors.course = 'Course is required.';
        if (!form.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required.';
        } else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number.';
        }
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        // Clear individual field error on change
        if (errors[name]) setErrors({ ...errors, [name]: '' });
        if (serverError) setServerError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setSubmitting(true);
            await StudentService.createStudent(form);
            navigate('/', { state: { success: 'Student added successfully!' } });
        } catch (err) {
            if (err.response?.data?.message) {
                setServerError(err.response.data.message);
            } else if (typeof err.response?.data === 'object') {
                setErrors(err.response.data);
            } else {
                setServerError('Failed to add student. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <div className="form-card">
                <div className="form-card-header">
                    <h2>Add New Student</h2>
                    <p>Fill in the details below to register a new student.</p>
                </div>

                {serverError && <div className="alert alert-error">{serverError}</div>}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name *</label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                className={errors.firstName ? 'input-error' : ''}
                            />
                            {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name *</label>
                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                className={errors.lastName ? 'input-error' : ''}
                            />
                            {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address *</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter email address"
                            className={errors.email ? 'input-error' : ''}
                        />
                        {errors.email && <span className="error-msg">{errors.email}</span>}
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="course">Course *</label>
                            <select
                                id="course"
                                name="course"
                                value={form.course}
                                onChange={handleChange}
                                className={errors.course ? 'input-error' : ''}
                            >
                                <option value="">-- Select Course --</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Software Engineering">Software Engineering</option>
                                <option value="Data Science">Data Science</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Electronics Engineering">Electronics Engineering</option>
                                <option value="Mechanical Engineering">Mechanical Engineering</option>
                                <option value="Business Administration">Business Administration</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                            </select>
                            {errors.course && <span className="error-msg">{errors.course}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number *</label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                name="phoneNumber"
                                value={form.phoneNumber}
                                onChange={handleChange}
                                placeholder="e.g. +91 9876543210"
                                className={errors.phoneNumber ? 'input-error' : ''}
                            />
                            {errors.phoneNumber && <span className="error-msg">{errors.phoneNumber}</span>}
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary" disabled={submitting}>
                            {submitting ? 'Adding...' : '+ Add Student'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
