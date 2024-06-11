import React, { useState } from "react";
import axios from "../utils/api";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
const ApplyLeave = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    student_id: user._id,
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
      toast.success("Application Sent");
      setTimeout(() => {
        toast("🚀 Wait for approval");
      }, 2000);
    } catch (error) {
      toast.error("Please Logout and try again...");
      console.log(error);
    }
  };
  return (
    <div
      className="h-fit bg-cover text-white p-20 flex items-center justify-center"
      style={{ backgroundImage: `url('/Frame 1.svg')` }}
    >
      <div className="bg-black text-white p-6 rounded-lg shadow-md md:mx-auto md:max-w-md border border-gray-700">
        <h1 className="text-2xl font-bold mb-6">Apply for Leave</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <span className="block mb-1">Leave Type</span>
            <select
              name="leave_type"
              value={formData.leave_type}
              onChange={handleChange}
              required
              className="block w-full px-4 py-2 border border-gray-900 rounded-md bg-[#171717] text-white focus:outline-none"
            >
              <option value="">Select Leave Type</option>
              <option value="regular">Regular</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <div className="flex justify-between gap-4">
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
    </div>
  );
};

export default ApplyLeave;
