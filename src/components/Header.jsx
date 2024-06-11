import { Link, useLocation, Navigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out", {
      autoClose: 1000,
      pauseOnHover: false,
      hideProgressBar: true,
      theme: "dark",
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className="bg-black text-white border-b border-gray-900 py-6 fixed top-0 left-0 right-0 px-8 flex items-center justify-between">
      <Link to="#" className="logo text-2xl">
        <img src="/logo.svg" alt="" className="max-h-7" />
      </Link>
      <nav className="flex items-center gap-6">
        {user && (
          <Link
            to="/student/dashboard"
            className="hidden md:block"
          >
            Dashboard
          </Link>
        )}
        <div className="relative">
          {user ? (
            <FaUserCircle
              onClick={toggleDropdown}
              className="text-2xl cursor-pointer"
            />
          ) : (
            <GiHamburgerMenu className="block text-2xl sm:hidden" />
          )}
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
