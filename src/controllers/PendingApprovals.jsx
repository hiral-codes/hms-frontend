import React from "react";

const PendingApprovals = ({ pendingApprovals, onApproveRejectUser }) => {
  return (
    <div>
      <h2>Pending User Approvals</h2>
      <ul>
        {pendingApprovals.map((approval) => (
          <li key={approval._id}>
            {approval.name} - {approval.role}
            <button onClick={() => onApproveRejectUser(approval._id, "approved")}>
              Approve
            </button>
            <button onClick={() => onApproveRejectUser(approval._id, "rejected")}>
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PendingApprovals;
