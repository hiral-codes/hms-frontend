import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ApplyLeave from "../controllers/ApplyLeave";
import { toast } from "react-toastify";

function StudentDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  if (loading) {
    return (toast.loading("Loading..."))
  }
  return (
    <React.Fragment>
      <div className="p-20">
          <div className="max-w-screen-md">
            Welcome, {user.name}
            <ApplyLeave userId={user._id}/>
          </div>
      </div>
    </React.Fragment>
  );
}

export default StudentDashboard;
