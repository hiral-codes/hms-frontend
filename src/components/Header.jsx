import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user");
    navigate("/");
    toast.success("Logged out", { autoClose: 1000, pauseOnHover: false, hideProgressBar: true, theme: "dark" });
  };

  const menuItems = [];

  if (user && user.role === 'student') {
    // Add routes for authenticated users
    menuItems.push({ label: "Dashboard", path: "/student/dashboard" });
    menuItems.push({ label: "Apply Leave", path: "/student/apply-leave" });
    menuItems.push({ label: "Track Leave", path: "/student/track-leave" });
    menuItems.push({ label: "Profile", path: "/profile" });
    menuItems.push({ label: "Logout", onClick: handleLogout });
  } else if (user && user.role === 'warden') {
    menuItems.push({ label: "Dashboard", path: "/warden/dashboard" });
    menuItems.push({ label: "View Leave Requests", path: "/warden/view-leave" });
    menuItems.push({ label: "View Attendance", path: "/warden/view-attendance" });
    menuItems.push({ label: "Profile", path: "/profile" });
    menuItems.push({ label: "Logout", onClick: handleLogout });
  } else if (user && user.role === 'class_coordinator') {
    menuItems.push({ label: "Dashboard", path: "/coordinator/dashboard" });
    menuItems.push({ label: "View Leave Requests", path: "/coordinator/view-leave" });
    menuItems.push({ label: "View Attendance", path: "/coordinator/view-attendance" });
    menuItems.push({ label: "Profile", path: "/profile" });
    menuItems.push({ label: "Logout", onClick: handleLogout });
  } else {
    // Add routes for non-authenticated users
    menuItems.push({ label: "Home", path: "/" });
    menuItems.push({ label: "About", path: "/about" });
    menuItems.push({ label: "Contact Us", path: "/contact" });
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-black text-white border-b border-gray-900 py-6 fixed top-0 left-0 right-0 px-8 flex items-center justify-between z-10">
      <Link to="#" className="logo text-2xl">
        <img src="/logo.svg" alt="" className="max-h-7" />
      </Link>
      <nav>
        <ul className={`md:flex gap-6 ${isMobileMenuOpen ? 'flex' : 'hidden'} flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-black md:bg-transparent`}>
          {menuItems.map((item, index) => (
            <li key={index} className="border-b md:border-none border-gray-700 md:py-0 py-2 px-8 md:px-0">
              {item.path ? (
                <Link
                  to={item.path}
                  className={location.pathname === item.path ? "text-blue-500" : ""}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <button onClick={() => { item.onClick(); setIsMobileMenuOpen(false); }}>{item.label}</button>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <GiHamburgerMenu className="block text-2xl md:hidden cursor-pointer" onClick={toggleMobileMenu} />
    </div>
  );
}

export default Header;
