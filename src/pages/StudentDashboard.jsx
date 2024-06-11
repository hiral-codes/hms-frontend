import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return <div className="loaderContainer">Loading...</div>;
  }
  return (
      <div
        className="bg-cover loaderContainer text-white"
        style={{ backgroundImage: `url('/Frame 1.svg')` }}
      >
        <div className="text-center">
          <h1 className="text-5xl">Welcome, {user.name}</h1>
          <h1 className="text-xl pt-4">🥱I'll design it Later</h1>

          {/* <ApplyLeave userId={user._id}/>
            <TrackLeaveStatus/> */}
        </div>
      </div>
  );
}

export default StudentDashboard;
