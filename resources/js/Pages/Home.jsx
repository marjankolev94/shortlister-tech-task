import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function Home({ users, flash }) {
    const itemsPerPage = 10; // Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(users.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return;

        router.delete(`/users/${id}`);

        window.location.reload();
    };

    return (
        <div className="container mt-5">
            {flash?.success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {flash.success}
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    ></button>
                </div>
            )}
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary">Users</h2>

            <Link href="/users/create" className="btn btn-primary">
                Create New User
            </Link>
            </div>

            <table className="table table-striped table-bordered">
                <thead className="table-primary">
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Age (years)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.length > 0 ? (
                    currentUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.full_name}</td>
                            <td>
                                {user.email ? (
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                ) : (
                                    ''
                                )}
                            </td>
                            <td>{user.phone}</td>
                            <td>{user.age}</td>
                            <td>
                                <Link
                                    href={`/users/${user.id}/edit`}
                                    className="btn btn-sm btn-warning me-2"
                                >
                                    Edit
                                </Link>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="5" className="text-center">
                        No users found
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                        >
                        {page}
                        </button>
                    </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
}
