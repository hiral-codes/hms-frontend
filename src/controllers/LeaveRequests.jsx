import React from "react";

const LeaveRequests = ({ leaveRequests, onApproveRejectLeaveRequest }) => {
  return (
    <div>
      <h2>Leave Requests</h2>
      <ul>
        {leaveRequests.map((request) => (
          <li key={request._id}>
            {request.name} - {request.reason}
            <button onClick={() => onApproveRejectLeaveRequest(request._id, "approved")}>
              Approve
            </button>
            <button onClick={() => onApproveRejectLeaveRequest(request._id, "rejected")}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaveRequests;
