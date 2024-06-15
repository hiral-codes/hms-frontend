import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WardenDashboard from "./pages/WardenDashboard";
import CoordinatorDashboard from "./pages/CoordinatorDashboard";
// import PrincipalDashboard from './pages/PrincipalDashboard';
import StudentDashboard from "./pages/StudentDashboard";
import ApplyLeave from "./controllers/ApplyLeave";
import TrackLeaveStatus from "./controllers/LeaveStatus";
import CompleteRegistration from "./components/CompleteRegistration";
import NotFound from "./pages/PageNotFound";
import LeaveRequests from "./controllers/LeaveRequests";
import LeaveRequestsCC from "./controllers/LeaveRequestsCC";
import PrincipalDashboard from "./pages/PrincipalDashboard";
import LeaveRequestsPrincipal from "./controllers/LeaveRequestsPrincipal";
import UserApproval from "./controllers/UserApproval";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="dark"
        hideProgressBar={true}
        closeButton={false}
      />
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route
            path="/complete-registration"
            element={<CompleteRegistration />}
          />
          <Route path="/student/apply-leave" element={<ApplyLeave />} />
          <Route path="/student/track-leave" element={<TrackLeaveStatus />} />
          <Route path="/warden/dashboard" element={<WardenDashboard />} />
          <Route path="/warden/view-leave" element={<LeaveRequests />} />
          <Route
            path="/coordinator/dashboard"
            element={<CoordinatorDashboard />}
          />
          <Route path="/coordinator/view-leave" element={<LeaveRequestsCC />} />
          <Route path="/principal/dashboard" element={<PrincipalDashboard />} />
          <Route path="/principal/view-leave" element={<LeaveRequestsPrincipal />} />
          <Route path="/principal/approval" element={<UserApproval />} />
          {/* <Route path="/principal/dashboard" element={<PrincipalDashboard />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
