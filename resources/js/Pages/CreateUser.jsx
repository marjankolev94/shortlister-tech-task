import React from 'react';
import { router, useForm } from '@inertiajs/react';

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    birth_date: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/users/store');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4">Create New User</h2>

      <form onSubmit={submit} noValidate>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className={`form-control ${errors.full_name ? 'is-invalid' : ''}`}
            value={data.full_name}
            onChange={(e) => setData('full_name', e.target.value)}
          />
          {errors.full_name && <div className="invalid-feedback">{errors.full_name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={data.email}
            onChange={(e) => setData('email', e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input
            type="text"
            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
            value={data.phone}
            onChange={(e) => setData('phone', e.target.value)}
          />
          {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Birth Date</label>
          <input
            type="date"
            className={`form-control ${errors.birth_date ? 'is-invalid' : ''}`}
            value={data.birth_date}
            onChange={(e) => setData('birth_date', e.target.value)}
          />
          {errors.birth_date && (
            <div className="invalid-feedback">{errors.birth_date}</div>
          )}
        </div>

        <button type="button" className="btn btn-secondary" onClick={() => router.visit('/')}>
          Back
        </button>&nbsp;
        <button className="btn btn-primary" disabled={processing}>
          Save
        </button>
      </form>
    </div>
  );
}