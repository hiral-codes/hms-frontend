import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../utils/api";
import { toast } from "react-toastify";
import "tailwindcss/tailwind.css";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaUser,
  FaPhone,
  FaHome,
  FaAddressCard,
  FaGraduationCap,
  FaRegTimesCircle,
} from "react-icons/fa";
import { BsCake, BsPatchQuestionFill } from "react-icons/bs";

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
      console.log("Fetched leave requests successfully:", leaveRequestsData);
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
      console.log("Fetched all student data successfully:", studentData);
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
      <h2 className="text-3xl font-bold mb-4">
        Leave Requests ({leaveRequests.length})
      </h2>
      <ul className="space-y-4">
        {leaveRequests.map((request) => {
          const student = students[request.student_id];
          return (
            <li
              key={request._id}
              className="p-4 bg-gray-700 shadow-md rounded-lg flex flex-col md:flex-row items-center justify-between"
            >
              {student && (
                <div className="flex flex-col md:flex-row items-center flex-1">
                  <img
                    src={getAvatar(student)}
                    alt="avatar"
                    className="max-w-[90px] max-h-[90px] rounded-full mr-4 mb-4 md:mb-0"
                  />
                  <div className="text-center md:text-left">
                    <p className="font-bold text-green-500 text-sm flex items-center">
                      <FaUser className="mr-2" />
                      {student.name}
                    </p>
                    <p className="font-bold text-gray-300 text-sm flex items-center">
                      <FaAddressCard className="mr-2" />
                      {student.enrollmentNo}
                    </p>
                    <p className="text-gray-300 font-bold capitalize text-sm flex items-center">
                      <FaGraduationCap className="mr-2 text-sm" />
                      {student.branch} SEM - {student.semester}
                    </p>
                    <p className="text-gray-300 font-bold capitalize text-sm flex items-center">
                      <BsCake className="mr-2 text-sm" />
                      {student.dob}
                    </p>
                    <p className="text-gray-300 font-bold text-sm flex items-center">
                      <FaHome className="mr-2" />
                      Address: {student.address}
                    </p>
                    <p className="text-gray-300 font-bold text-sm flex items-center">
                      <FaPhone className="mr-2" />
                      Parent's Mobile: {request.parent_mobile}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex-1 text-center md:text-left mt-4 md:mt-0">
                <p className="text-base flex items-center text-gray-300">
                  <BsPatchQuestionFill className="mr-2" />
                  <span className="font-bold">Reason :</span>
                  <span className="capitalize pl-1">{request.reason}</span>
                </p>
                <p className="text-base flex items-center text-gray-300">
                  <FaRegTimesCircle className="mr-2" />
                  <span className="font-bold">Duration :</span>
                  <span className="capitalize pl-1">
                    {request.start_date} to {request.end_date}
                  </span>
                </p>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <button
                  onClick={() => handleStatusChange(request._id, "approved")}
                  className="bg-green-600 px-4 py-2 rounded-md text-white flex items-center justify-center"
                >
                  <FaCheckCircle className="mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => handleStatusChange(request._id, "rejected")}
                  className="bg-red-600 px-4 py-2 rounded-md text-white flex items-center justify-center"
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
