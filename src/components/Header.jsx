import { Link, useLocation, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaBell } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const toggleNotificationMenu = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileMenuOpen(false);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  const getAvatar = () => {
    try {
      if (user && user.image && user.image.data) {
        const chunkSize = 1024;
        const bytes = new Uint8Array(user.image.data);
        const byteCharacters = [];

        for (let i = 0; i < bytes.length; i += chunkSize) {
          const chunk = bytes.slice(i, i + chunkSize);
          byteCharacters.push(...chunk);
        }

        const base64String = btoa(
          String.fromCharCode.apply(null, byteCharacters)
        );
        return `data:image/png;base64,${base64String}`;
      }
      return "/avatar.png"; // User or image data not available
    } catch (error) {
      console.error("Error generating Base64:", error);
      return "/avatar.png"; // Fallback to default avatar on error
    }
  };

  const menuItems = [];

  if (user) {
    if (user.role === "student") {
      menuItems.push({ label: "Dashboard", path: "/student/dashboard" });
      menuItems.push({ label: "Apply Leave", path: "/student/apply-leave" });
      menuItems.push({ label: "Track Leave", path: "/student/track-leave" });
      menuItems.push({ label: "Profile", path: "/profile" });
    } else if (user.role === "warden") {
      menuItems.push({ label: "Dashboard", path: "/warden/dashboard" });
      menuItems.push({
        label: "View Leave Requests",
        path: "/warden/view-leave",
      });
      menuItems.push({
        label: "View Attendance",
        path: "/warden/view-attendance",
      });
      menuItems.push({ label: "Profile", path: "/profile" });
    } else if (user.role === "class_coordinator") {
      menuItems.push({ label: "Dashboard", path: "/coordinator/dashboard" });
      menuItems.push({
        label: "View Leave Requests",
        path: "/coordinator/view-leave",
      });
      menuItems.push({
        label: "View Attendance",
        path: "/coordinator/view-attendance",
      });
      menuItems.push({ label: "Profile", path: "/profile" });
    }
  } else {
    menuItems.push({ label: "Home", path: "/" });
    menuItems.push({ label: "About", path: "/about" });
    menuItems.push({ label: "Contact Us", path: "/contact" });
  }

  return (
    <div className="bg-black text-white border-b border-gray-900 py-6 fixed top-0 left-0 right-0 px-8 flex items-center justify-between z-10">
      <Link to="#" className="logo text-2xl">
        <img src="/logo.svg" alt="Logo" className="max-h-7" />
      </Link>
      <nav>
        <ul
          className={`md:flex gap-6 ${
            isMobileMenuOpen ? "flex" : "hidden"
          } flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-black md:bg-transparent`}
        >
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="border-b md:border-none border-gray-700 md:py-0 py-2 px-8 md:px-0"
            >
              <Link
                to={item.path}
                className={
                  location.pathname === item.path ? "text-blue-500" : ""
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {user ? (
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800 p-1"               onClick={toggleNotificationMenu}
            >
            <FaBell
              className="text-xl cursor-pointer text-white"
            />
            </div>
            {isNotificationOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
                <ul>
                  <li className="p-2 border-b border-gray-600">
                    Notification 1
                  </li>
                  <li className="p-2 border-b border-gray-600">
                    Notification 2
                  </li>
                  <li className="p-2">Notification 3</li>
                </ul>
              </div>
            )}
          </div>
          <div className="relative">
            <img
              src={getAvatar()}
              alt="User Avatar"
              className="w-8 h-8 rounded-full cursor-pointer flex-shrink-0"
              onClick={toggleProfileMenu}
            />
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 px-4 py-1 bg-gray-900 text-gray-300 rounded-lg shadow-lg">
                <div className="p-2 border-b border-gray-600">
                  <p>{user.name}</p>
                  <p className="text-base text-gray-500">{user.email}</p>
                </div>
                <ul>
                  <li className="p-2 border-b border-gray-600">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li className="p-2 border-b border-gray-600">
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Settings
                    </Link>
                  </li>
                  <li className="p-2">
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : null}
      <GiHamburgerMenu
        className="block text-2xl md:hidden cursor-pointer"
        onClick={toggleMobileMenu}
      />
    </div>
  );
}

export default Header;
