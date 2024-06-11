// components/TrackLeaveStatus.js
import React, { useEffect, useState, useContext } from 'react';
import axios from '../utils/api';
import { AuthContext } from '../contexts/AuthContext';
const TrackLeaveStatus = () => {
  const { user } = useContext(AuthContext);
  const [leaveRequests, setLeaveRequests] = useState([]);
    useEffect(() => {
      const fetchLeaveRequests = async () => {
        try {
          const response = await axios.get(`/students/track-leave-status/${user._id}`);
          setLeaveRequests(response.data);
          console.log(response.data);
        } catch (err) {
          console.error('Error fetching leave requests');
        }
      };
      fetchLeaveRequests();
    }, []);

  return (
    <div className='text-center'>
      <h2>Track Leave Status</h2>
      <ul>
        {leaveRequests.map((leave) => (
          <li key={leave._id}>
            {leave.reason} - {leave.status} By
            - {leave.current_stage}, From {leave.start_date} To: {leave.end_date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackLeaveStatus;
