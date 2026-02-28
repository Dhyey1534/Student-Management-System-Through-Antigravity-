import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import './App.css';

function AppContent() {
  const location = useLocation();
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    if (location.state?.success) {
      setSuccessMsg(location.state.success);
      const timer = setTimeout(() => setSuccessMsg(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-content">
          <Link to="/" className="header-brand">
            <span className="brand-icon">🎓</span>
            <div>
              <h1>Student Management System</h1>
              <span className="header-subtitle">Manage student records efficiently</span>
            </div>
          </Link>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/add-student" className="nav-link nav-link-cta">+ Add Student</Link>
          </nav>
        </div>
      </header>

      <main className="app-main">
        {successMsg && (
          <div className="alert alert-success global-alert">
            ✅ {successMsg}
          </div>
        )}
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>© 2025 Student Management System. Built with Spring Boot &amp; React.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
