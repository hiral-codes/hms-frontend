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
    return <div>Loading...</div>
  }
  return (
    <React.Fragment>
      <div className="p-20">
          <div className="text-center">
            <h1 className="text-5xl">Welcome, {user.name}</h1>
            <h1 className="text-xl">Other Features Coming Soon....</h1>

            {/* <ApplyLeave userId={user._id}/>
            <TrackLeaveStatus/> */}
          </div>
      </div>
    </React.Fragment>
  );
}

export default StudentDashboard;
