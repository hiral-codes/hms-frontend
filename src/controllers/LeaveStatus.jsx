// components/TrackLeaveStatus.js
import React, { useEffect, useState } from 'react';
import axios from '../utils/api';

const TrackLeaveStatus = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('/api/student/track-leave-status');
        setLeaveRequests(response.data);
      } catch (err) {
        console.error('Error fetching leave requests');
      }
    };

    fetchLeaveRequests();
  }, []);

  return (
    <div>
      <h2>Track Leave Status</h2>
      <ul>
        {leaveRequests.map((leave) => (
          <li key={leave._id}>
            {leave.reason} - {leave.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackLeaveStatus;
