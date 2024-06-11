import React, { useState } from "react";
import axios from "../utils/api";
import { toast } from "react-toastify";

const ApplyLeave = ({ userId }) => {  
  const [formData, setFormData] = useState({
    student_id: userId,
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    parent_mobile: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/students/apply-leave`, formData);
      setFormData({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
        parent_mobile: "",
      });
      // Send email to the warden
      const emailResponse = await axios.post(`/email/send-email`, {
        to: "warden@example.com", // Warden's email address
        subject: "Leave Application Notification",
        text: `Student ID: ${userId}\nLeave Type: ${formData.leave_type}\nStart Date: ${formData.start_date}\nEnd Date: ${formData.end_date}\nReason: ${formData.reason}`
      });
      if (emailResponse.status === 200) {
        toast.success("Application Sent and Warden Notified");
      } else {
        toast.warn("Application Sent but Failed to Notify Warden");
      }
    } catch (error) {
      toast.error("Error submitting leave application");
      console.log(error);
    }
  };
  return (
    <div className="bg-black text-white p-6 rounded-lg shadow-md md:mx-auto md:max-w-md">
      <h1 className="text-2xl font-bold mb-6">Apply for Leave</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <span className="block mb-1">Leave Type:</span>
          <select
            name="leave_type"
            value={formData.leave_type}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-900 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Leave Type</option>
            <option value="regular">Regular</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
        <div className="flex justify-between">
          <div className="mb-4">
            <span className="block mb-1">From</span>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-900 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <span className="block mb-1">To</span>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-900 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="mb-4">
          <span className="block mb-1">Reason:</span>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-900 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <span className="block mb-1">Parent's Mobile:</span>
          <input
            type="text"
            name="parent_mobile"
            value={formData.parent_mobile}
            onChange={handleChange}
            required
            className="block w-full px-4 py-2 border border-gray-900 rounded-md bg-gray-800 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Apply
        </button>
      </form>
    </div>
  );
};

export default ApplyLeave;
