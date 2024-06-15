import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../utils/api";
import { toast } from "react-toastify";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaPhone,
  FaHome,
  FaAddressCard,
  FaGraduationCap,
} from "react-icons/fa";
import { BsCake, BsPatchQuestionFill } from "react-icons/bs";
import { IoTime } from "react-icons/io5";

import dayjs from "dayjs";

const LeaveRequests = () => {
  const { getAvatar } = useContext(AuthContext);
  const [students, setStudents] = useState({});
  const [leaveRequests, setLeaveRequests] = useState([]);

  // Fetch leave requests on component mount
  const fetchLeaveRequests = async () => {
    try {
      const response = await axios.get(`/warden/leave-requests`);
      const leaveRequestsData = response.data;
      setLeaveRequests(leaveRequestsData);
      return leaveRequestsData;
    } catch (error) {
      console.log("Error fetching leave requests:", error);
    }
  };

  // Fetch student details
  const fetchStudents = async (leaveRequestsData) => {
    try {
      const studentIds = [
        ...new Set(leaveRequestsData.map((req) => req.student_id)),
      ];
      const studentResponses = await Promise.all(
        studentIds.map((id) => axios.get(`/students/profile/${id}`))
      );
      const studentData = studentResponses.reduce((acc, res) => {
        acc[res.data._id] = res.data;
        return acc;
      }, {});
      setStudents(studentData);
    } catch (error) {
      console.log("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const leaveRequestsData = await fetchLeaveRequests();
      if (leaveRequestsData && leaveRequestsData.length > 0) {
        await fetchStudents(leaveRequestsData);
      }
    };

    fetchAllData();
  }, []);

  // Handle status change for leave request
  const handleStatusChange = async (requestId, status) => {
    try {
      await axios.post(`/warden/leave-requests/${requestId}`, {
        status,
      });
      const leaveRequestsData = await fetchLeaveRequests();
      if (leaveRequestsData && leaveRequestsData.length > 0) {
        await fetchStudents(leaveRequestsData);
      }
      if (status === "approved") {
        toast.success("Leave Approved");
      } else {
        toast.info("Leave Rejected");
      }
      setLeaveRequests((prev) =>
        prev.map((req) => (req._id === requestId ? { ...req, status } : req))
      );
    } catch (error) {
      console.log(
        "Error updating leave request status:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="p-4 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-6">Leave Requests ({leaveRequests.length})</h2>
      <ul className="space-y-6">
        {leaveRequests.map((request) => {
  
          const student = students[request.student_id];
          const startDate = dayjs(request.start_date).format("DD-MM-YY");
          const endDate = dayjs(request.end_date).format("DD-MM-YY");
          return (
            <li
              key={request._id}
              className="p-6 bg-gray-800 shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 md:space-x-6"
            >
              {student && (
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                  <img
                    src={getAvatar(student)}
                    alt="avatar"
                    className="w-24 h-24 rounded-full"
                  />
                  <div className="text-center md:text-left">
                    <p className="font-bold text-xl text-green-500 flex items-center justify-center md:justify-start mb-1">
                      <FaUser className="mr-2" />
                      {student.name}
                    </p>
                    <p className="text-gray-300 flex items-center justify-center md:justify-start mb-1">
                      <FaAddressCard className="mr-2" />
                      {student.enrollmentNo}
                    </p>
                    <p className="text-gray-300 flex items-center justify-center md:justify-start mb-1">
                      <FaGraduationCap className="mr-2" />
                      {student.branch} SEM - {student.semester}
                    </p>
                    <p className="text-gray-300 flex items-center justify-center md:justify-start mb-1">
                      <BsCake className="mr-2" />
                      {dayjs(student.dob).format("DD-MMMM-YYYY")}
                    </p>
                    <p className="text-gray-300 flex items-center justify-center md:justify-start mb-1">
                      <FaHome className="mr-2" />
                      {student.address}
                    </p>
                    <p className="text-gray-300 flex items-center justify-center md:justify-start">
                      <FaPhone className="mr-2" />
                      {request.parent_mobile}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex-grow text-center md:text-left">
                <p className="text-base flex items-center justify-center md:justify-start text-gray-300 mb-2">
                  <BsPatchQuestionFill className="mr-2" />
                  <span className="font-bold">Reason:</span>
                  <span className="pl-1">{request.reason}</span>
                </p>
                <p className="text-base flex items-center justify-center md:justify-start text-gray-300">
                  <IoTime  className="mr-2" />
                  <span className="font-bold">Duration:</span>
                  <span className="pl-1">
                    {startDate} to {endDate}
                  </span>
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleStatusChange(request._id, "approved")}
                  className="bg-green-600 px-4 py-2 rounded-md text-white flex items-center"
                >
                  <FaCheckCircle className="mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(request._id, "rejected")}
                  className="bg-red-600 px-4 py-2 rounded-md text-white flex items-center"
                >
                  <FaTimesCircle className="mr-2" />
                  Reject
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeaveRequests;
