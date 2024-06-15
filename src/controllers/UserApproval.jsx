import React, { useEffect, useState } from "react";
import axios from "../utils/api";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function UserApproval() {
  const [users, setUsers] = useState([]);

  const fetchApprovalRequests = async () => {
    try {
      const response = await axios.get(`/principal/pending-approvals`);
      setUsers(response.data);
    } catch (error) {
      console.log("Error fetching approval requests:", error);
    }
  };

  const handleApprove = async (_id) => {
    try {
      await axios.post(`/principal/approve-user/${_id}`);
      // Update the state to remove the approved user
      setUsers(users.filter((user) => user._id !== _id));
    } catch (error) {
      console.log("Error approving user:", error);
    }
  };

  const handleReject = async (_id) => {
    try {
      await axios.post(`/principal/reject-user/${_id}`);
      // Update the state to remove the rejected user
      setUsers(users.filter((user) => user._id !== _id));
    } catch (error) {
      console.log("Error rejecting user:", error);
    }
  };

  useEffect(() => {
    fetchApprovalRequests();
  }, []);

  return (
    <div className="dark">
      <div className="container mx-auto p-4 bg-black dark:text-white">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">User Approval</h1>
        </div>
        <div className="overflow-x-auto bg-gray-800 shadow-md rounded-lg">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Branch
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-700 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">
                    {user.name}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">
                    {user.email}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">
                    {user.role}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm">
                    {user.branch ? user.branch : "N/A"}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-700 bg-gray-800 text-sm flex items-center space-x-2">
                    <button
                      onClick={() => handleApprove(user._id)}
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaCheckCircle size={20} />
                    </button>
                    <button
                      onClick={() => handleReject(user._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTimesCircle size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserApproval;
