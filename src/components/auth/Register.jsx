import React, { useState } from "react";
import axios from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student"); // Default role is student
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    // Check if password meets criteria of a strong password
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }
    let url = "/auth/register"; // Default registration URL
    // Set the registration URL based on the selected role
    if (role === "warden") {
      url = "/auth/register-warden";
    } else if (role === "coordinator") {
      url = "/auth/register-coordinator";
    }
    const registrationPromise = axios.post(url, {
      name,
      email,
      password,
    });

    toast.promise(
      registrationPromise,
      {
        pending: "🥱Please wait...",
        success: "😍 Registration successful!",
        error: {
          render({ data }) {
            if (
              data.response &&
              data.response.data &&
              data.response.data.error
            ) {
              return `🙄 ${data.response.data.error}`;
            }
            return "Registration failed";
          },
        },
      },
      {
        autoClose: 2000,
      }
    );

    try {
      await registrationPromise;
      navigate("/login");
      toast.info("You can login now...")
    } catch (error) {
      console.error("Registration error:", error);
    }
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
                Register
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="name"
                    id="name"
                    placeholder="Email"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <select
                    name="role"
                    id=""
                    value={role}
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option selected value="">
                      Select Role
                    </option>
                    <option value="student">Student</option>
                    <option value="warden">Warden</option>
                    <option value="coordinator">Coordinator</option>
                  </select>
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
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <p className="text-sm text-red-600 italic">
                  {/* Show error if passwords do not match */}
                  {password !== confirmPassword && "Passwords do not match"}
                </p>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Register
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
                  <span>Continue with Google</span>
                </button>
              </div>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Forget Password?
                <Link
                  to="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500 pl-2"
                >
                  Reset
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500 pl-2"
                >
                  Login Here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
