// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import PendingApprovals from "../controllers/PendingApprovals";
// import LeaveRequests from "../controllers/LeaveRequests";
// import RegisteredUsers from "../controllers/RegisteredUsers";

// const PrincipalDashboard = () => {
//   const [pendingApprovals, setPendingApprovals] = useState([]);
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [registeredUsers, setRegisteredUsers] = useState([]);

//   // Fetch pending approvals on component mount
//   useEffect(() => {
//     const fetchPendingApprovals = async () => {
//       try {
//         const response = await axios.get("/principal/pending-approvals");
//         setPendingApprovals(response.data);
//       } catch (error) {
//         console.error("Error fetching pending approvals:", error);
//       }
//     };
//     fetchPendingApprovals();
//   }, []);

//   // Fetch leave requests on component mount
//   useEffect(() => {
//     const fetchLeaveRequests = async () => {
//       try {
//         const response = await axios.get("/principal/leave-requests");
//         setLeaveRequests(response.data);
//       } catch (error) {
//         console.error("Error fetching leave requests:", error);
//       }
//     };
//     fetchLeaveRequests();
//   }, []);

//   // Fetch registered users on component mount
//   useEffect(() => {
//     const fetchRegisteredUsers = async () => {
//       try {
//         const response = await axios.get("/principal/registered-users");
//         setRegisteredUsers(response.data);
//       } catch (error) {
//         console.error("Error fetching registered users:", error);
//       }
//     };
//     fetchRegisteredUsers();
//   }, []);

//   // Function to handle approval/rejection of user
//   const handleApproveRejectUser = async (userId, status) => {
//     try {
//       await axios.post(`/principal/approve-user/${userId}`, { status });
//       // Refetch pending approvals after approval/rejection
//       const response = await axios.get("/principal/pending-approvals");
//       setPendingApprovals(response.data);
//     } catch (error) {
//       console.error("Error approving/rejecting user:", error);
//     }
//   };

//   // Function to handle approval/rejection of leave request
//   const handleApproveRejectLeaveRequest = async (leaveId, status) => {
//     try {
//       await axios.put(`/leave-requests/${leaveId}`, { status });
//       // Refetch leave requests after approval/rejection
//       const response = await axios.get("/principal/leave-requests");
//       setLeaveRequests(response.data);
//     } catch (error) {
//       console.error("Error approving/rejecting leave request:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Principal Dashboard</h1>
//       <PendingApprovals
//         pendingApprovals={pendingApprovals}
//         onApproveRejectUser={handleApproveRejectUser}
//       />
//       <LeaveRequests
//         leaveRequests={leaveRequests}
//         onApproveRejectLeaveRequest={handleApproveRejectLeaveRequest}
//       />
//       <RegisteredUsers registeredUsers={registeredUsers} />
//     </div>
//   );
// };

// export default PrincipalDashboard;
