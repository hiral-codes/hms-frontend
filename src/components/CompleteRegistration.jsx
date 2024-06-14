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
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("branch", branch);
    formData.append("enrollmentNo", enrollmentNo);
    formData.append("semester", semester);
    formData.append("roomNo", roomNo);
    formData.append("mobileNo", mobileNo);
    formData.append("address", address);
    formData.append("dob", dob);
    formData.append("image", image);
    formData.append("userId", user._id);

    try {
      const response = await axios.put(
        `/students/profile/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Data Updated Successfully");
      const userDataResponse = await axios.get(`/students/profile/${user._id}`);
      setUser(userDataResponse.data);
      navigate("/student/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div
      className="bg-cover pb-10 text-white"
      style={{ backgroundImage: `url('/Frame2.svg')` }}
    >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 sm:items-start sm:pl-20 md:pl-60">
        <div className="pt-20 w-full">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 border border-gray-900">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-200 md:text-2xl">
                Let's Add Academic Details
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <label
                    htmlFor="image"
                    className="relative cursor-pointer w-36 h-36 rounded-full border-2 border-gray-300 overflow-hidden flex justify-center items-center"
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Avatar Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center w-full h-full bg-gray-800 text-gray-500 text-lg">
                        Upload Image
                      </div>
                    )}
                  </label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div>
                  <select
                    name="branch"
                    value={branch}
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    onChange={(e) => {
                      setBranch(e.target.value);
                    }}
                  >
                    <option value="">Select Branch</option>
                    <option value="computer">Computer</option>
                    <option value="civivl">Civil</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="electrical">Electrical</option>
                  </select>
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
                    type="number"
                    name="semester"
                    id="semester"
                    placeholder="Semester"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    min="1"
                    max="8"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="roomNo"
                    id="roomNo"
                    placeholder="Hostel Room Number"
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
                  <label htmlFor="dob" className="text-gray-400 px-1 mb-4">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    id="dob"
                    className="border mt-2 border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    id="mobileNo"
                    placeholder="Address"
                    className="border border-gray-900 text-gray-200 sm:text-sm rounded-lg block w-full p-2.5 outline-none bg-[black]"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add Details
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
