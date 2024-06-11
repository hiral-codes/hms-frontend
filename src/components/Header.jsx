import { Link, useLocation, Navigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out", {autoClose:1000, pauseOnHover: false,hideProgressBar: true,theme:"dark"
    })
  };

  const menuItems = [];

  if (user && user.role === 'student') {
    // Add routes for authenticated users
    menuItems.push({ label: "Dashboard", path: "/student/dashboard" });
    menuItems.push({ label: "Apply Leave", path: "/student/apply-leave" });
    menuItems.push({ label: "Track Leave", path: "/student/track-leave" });
    menuItems.push({ label: "Profile", path: "/profile" });
    menuItems.push({ label: "Logout", onClick: handleLogout });
  } else {
    // Add routes for non-authenticated users
    menuItems.push({ label: "Home", path: "/" });
    menuItems.push({ label: "About", path: "/about" });
    menuItems.push({ label: "Contact Us", path: "/contact" });
  }

  return (
    <div className="bg-black text-white border-b border-gray-900 py-6 fixed top-0 left-0 right-0 px-8 flex items-center justify-between">
      <Link to="#" className="logo text-2xl">
        <img src="/logo.svg" alt="" className="max-h-7" />
      </Link>
      <nav>
        <ul className="hidden md:flex gap-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.path ? (
                <Link
                  to={item.path}
                  className={
                    location.pathname === item.path ? "text-blue-500" : ""
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <button onClick={item.onClick}>{item.label}</button>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <GiHamburgerMenu className="block text-2xl sm:hidden" />
    </div>
  );
}

export default Header;
