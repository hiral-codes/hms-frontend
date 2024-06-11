import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.promise(
      login(email, password).then((loggedInUser) => {
        if (loggedInUser) {
          // Check if user is approved
          if (
            (loggedInUser.role === "warden" ||
              loggedInUser.role === "class_coordinator") &&
            !loggedInUser.isApproved
          ) {
            logout();
            toast.error("Your account needs to be approved by the principal.");
            navigate("/");
          } else {
            // Check user role and redirect accordingly
            if (loggedInUser.role === "student") {
              navigate("/student/dashboard");
            } else if (loggedInUser.role === "warden") {
              navigate("/warden/dashboard");
            } else if (loggedInUser.role === "class_coordinator") {
              navigate("/coordinator/dashboard");
            } else if (loggedInUser.role === "principal") {
              navigate("/principal/dashboard");
            } else {
              navigate("/login");
            }
            setTimeout(() => {
              toast(`🚀 Welcome, ${loggedInUser.name}`);
            }, 900);
          }
        }
      }),
      {
        pending: "Logging in...",
        success: "Login success",
        error: {
          render({ data }) {
            return (
              data.message || "Login failed. Please check your credentials."
            );
          },
        },
      },
      { autoClose: 1000, icon: "🚀" }
    );
  };

  return (
    <div
      className="bg-cover text-white"
      style={{ backgroundImage: `url('/Frame2.svg')` }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 sm:items-start sm:pl-20 md:pl-60">
        <div className="pt-20 w-full">
          <div className="w-full  rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl">
                Login
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="emailId"
                    id="username"
                    placeholder="Username or Email Address"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* <p className="text-sm text-red-600 italic">{error}</p> */}
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login
                </button>
              </form>
              <p className="text-center text-[#ffffff89]">Or</p>
              <div className="flex items-center justify-center">
                <button className="px-4 py-2 border flex gap-2 border-gray-900 rounded-lg text-slate-700 dark:text-slate-200 hover:border-gray-600 hover:shadow transition duration-150">
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span>Login with Google</span>
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Forget Password?
                <Link
                  to="/forgetpassword"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500 pl-2"
                >
                  Reset
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500 pl-2"
                >
                  Sign Up Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
