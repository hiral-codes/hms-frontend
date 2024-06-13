import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "../utils/api";
import { toast } from "react-toastify";

const CompleteRegistration = () => {
  const [branch, setBranch] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [semester, setSemester] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("enrollmentNo", enrollmentNo);
    formData.append("semester", semester);
    formData.append("roomNo", roomNo);
    formData.append("mobileNo", mobileNo);
    formData.append("dob", dob);
    formData.append("image", image);
    formData.append("userId", user._id);

    try {
      const response = await axios.put(`/students/profile/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Registration complete");
      navigate("/student/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="bg-cover text-white" style={{ backgroundImage: `url('/Frame2.svg')` }}>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 sm:items-start sm:pl-20 md:pl-60">
        <div className="pt-20 w-full">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl">
                Complete Registration
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <input
                    type="text"
                    name="branch"
                    id="branch"
                    placeholder="Branch"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="enrollmentNo"
                    id="enrollmentNo"
                    placeholder="Enrollment Number"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={enrollmentNo}
                    onChange={(e) => setEnrollmentNo(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="semester"
                    id="semester"
                    placeholder="Semester"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="roomNo"
                    id="roomNo"
                    placeholder="Room Number"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={roomNo}
                    onChange={(e) => setRoomNo(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="mobileNo"
                    id="mobileNo"
                    placeholder="Mobile Number"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={mobileNo}
                    onChange={(e) => setMobileNo(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Complete Registration
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteRegistration;
