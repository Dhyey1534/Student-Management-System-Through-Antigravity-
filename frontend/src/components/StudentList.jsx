import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentService from '../services/StudentService';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await StudentService.getAllStudents();
            setStudents(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to load students. Make sure the backend is running.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, firstName, lastName) => {
        if (!window.confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) return;
        try {
            await StudentService.deleteStudent(id);
            setStudents(students.filter((s) => s.id !== id));
        } catch (err) {
            alert('Failed to delete student. Please try again.');
            console.error(err);
        }
    };

    const handleEdit = (id) => {
        navigate(`/edit-student/${id}`);
    };

    const filteredStudents = students.filter((s) => {
        const term = searchTerm.toLowerCase();
        return (
            s.firstName.toLowerCase().includes(term) ||
            s.lastName.toLowerCase().includes(term) ||
            s.email.toLowerCase().includes(term) ||
            s.course.toLowerCase().includes(term)
        );
    });

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading students...</p>
            </div>
        );
    }

    return (
        <div className="student-list-container">
            <div className="list-header">
                <h2>Student Records</h2>
                <div className="list-actions">
                    <input
                        type="text"
                        placeholder="Search by name, email or course..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="btn btn-primary" onClick={() => navigate('/add-student')}>
                        + Add Student
                    </button>
                </div>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            {filteredStudents.length === 0 && !error ? (
                <div className="empty-state">
                    <div className="empty-icon">👩‍🎓</div>
                    <p>{searchTerm ? 'No students match your search.' : 'No students found. Add your first student!'}</p>
                    {!searchTerm && (
                        <button className="btn btn-primary" onClick={() => navigate('/add-student')}>
                            Add First Student
                        </button>
                    )}
                </div>
            ) : (
                <>
                    <p className="record-count">{filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''} found</p>
                    <div className="table-wrapper">
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Course</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student, index) => (
                                    <tr key={student.id}>
                                        <td>{index + 1}</td>
                                        <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.email}</td>
                                        <td><span className="course-badge">{student.course}</span></td>
                                        <td>{student.phoneNumber}</td>
                                        <td className="action-cell">
                                            <button
                                                className="btn btn-edit"
                                                onClick={() => handleEdit(student.id)}
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                className="btn btn-delete"
                                                onClick={() => handleDelete(student.id, student.firstName, student.lastName)}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default StudentList;
