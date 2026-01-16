import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function EditUser({ user }) {
  const [form, setForm] = useState({
    full_name: user.full_name || '',
    email: user.email || '',
    phone: user.phone || '',
    birth_date: user.birth_date || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    router.put(`/users/${user.id}`, form, {
      onError: (err) => setErrors(err),
    });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Edit User</h2>

      <form onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            name="full_name"
            className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
            value={form.full_name}
            onChange={handleChange}
          />
          {errors.full_name && (
            <div className="invalid-feedback">{errors.full_name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={form.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>

        {/* Birth Date */}
        <div className="mb-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="birth_date"
            className={`form-control ${errors.birth_date ? 'is-invalid' : ''}`}
            value={form.birth_date}
            onChange={handleChange}
          />
          {errors.birth_date && (
            <div className="invalid-feedback">{errors.birth_date}</div>
          )}
        </div>

        <button type="submit" className="btn btn-secondary" onClick={() => router.visit('/')}>
          Back
        </button>&nbsp;
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}