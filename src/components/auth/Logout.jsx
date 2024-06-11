import React from "react";
import { useContext, useNavigate } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Logout({ className }) {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out", {
      autoClose: 1000,
      pauseOnHover: false,
      hideProgressBar: true,
    });
  };
  return (
    <button className={className} onClick={handleLogout}>
      Logout
    </button>
  );
}

export default Logout;
