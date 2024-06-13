import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Hostel Leave Management</h1>
          <p className="text-lg mb-8">
            Simplifying leave approval with seamless tracking.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/auth/register">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none transition duration-300">
                Get Started
              </button>
            </Link>
            <Link to="#">
              <button className="bg-gray-700 hover:bg-gray-800 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none transition duration-300">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <img
          src="https://img.freepik.com/free-vector/teen-male-students-group-dormitory-room-boy-characters-discussing-together_33099-134.jpg?t=st=1718308832~exp=1718312432~hmac=c72420fb82f640cdacc2e58299d88cdf64dfd6ead87fc2f38ec1cd2b43eaf38a&w=996"
          alt="Background"
          className="absolute inset-0 object-cover h-full w-full object-bottom opacity-20"
        />
      </section>
      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">How It Works</h2>
          <div className="flex flex-wrap gap-12 justify-center">
            {/* Feature Cards */}
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-gray-300">
              <img src="/warden.png" className="w-full h-96 object-cover object-top" alt="Warden" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Warden Approval</div>
                <p className="text-base">
                  Students apply for leave, which requires approval from the hostel warden.
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-gray-300">
              <img src="/teacher.png" className="w-full h-96 object-cover object-top" alt="Coordinator" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Coordinator Review</div>
                <p className="text-base">
                  Further verification by class coordinators ensures smooth processing.
                </p>
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-800 text-gray-300">
              <img src="/principal.png" className="w-full h-96 object-cover object-top" alt="Principal" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Principal Approval</div>
                <p className="text-base">
                  Final approval from the principal ensures proper leave management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Abstract */}
      <section className="py-20 bg-gray-950 text-gray-300">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-8">Project Overview</h2>
          <p className="text-lg leading-relaxed">
            Our hostel leave management system streamlines the process of leave
            application and approval for students. It involves stages of
            submission, warden approval, class coordinator review, and final
            approval by the principal. This ensures efficient handling of
            leave requests and enhances communication between students and
            administration.
          </p>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default Home;
