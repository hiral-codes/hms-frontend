import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Profile from './pages/Profile';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WardenDashboard from './pages/WardenDashboard';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
// import PrincipalDashboard from './pages/PrincipalDashboard';
import StudentDashboard from './pages/StudentDashboard';

const App = () => {
    return (
        <AuthProvider>
            <ToastContainer position='top-center' autoClose={3000} theme="dark" hideProgressBar={true}

            />
            <Router>
            <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                    <Route path="/warden/dashboard" element={<WardenDashboard />} />
                    <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
                    {/* <Route path="/principal/dashboard" element={<PrincipalDashboard />} /> */}
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
