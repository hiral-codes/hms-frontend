import React from "react";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div
      className="h-fit bg-cover text-white p-20 flex items-center justify-center"
      style={{ backgroundImage: `url('/Frame 1.svg')` }}
    >
      <div className="container justify-center items-center pt-40 flex flex-wrap gap-10">
        <Link to="/auth/login">
          <div className="card w-72 h-fit p-4 flex flex-col items-center rounded-lg border border-gray-900">
            <div className="h-60 w-60 mx-auto rounded-full border border-gray-900 overflow-hidden">
              <img src="/stu.png" className="cover" alt="" />
            </div>
            <div className="flex-1">
              <div className="title py-4 px-2 text-center text-2xl font-bold text-gray-300">
                Student
              </div>
            </div>
          </div>
        </Link>
        <Link to="/auth/login">
          <div className="card w-72 h-fit p-4 flex flex-col items-center rounded-lg border border-gray-900">
            <div className="h-60 w-60 mx-auto rounded-full border border-gray-900 overflow-hidden">
              <img src="/warden.png" className="cover" alt="" />
            </div>
            <div className="flex-1">
              <div className="title py-4 px-2 text-center text-2xl font-bold text-gray-300">
                Warden
              </div>
            </div>
          </div>
        </Link>
        <Link to="/auth/login">
          <div className="card w-72 h-fit p-4 flex flex-col items-center rounded-lg border border-gray-900">
            <div className="h-60 w-60 mx-auto rounded-full border border-gray-900 overflow-hidden">
              <img src="/teacher.png" className="cover" alt="" />
            </div>
            <div className="flex-1">
              <div className="title py-4 px-2 text-center text-2xl font-bold text-gray-300">
                Class Coordinator
              </div>
            </div>
          </div>
        </Link>
        <Link to="/auth/login">
          <div className="card w-72 h-fit p-4 flex flex-col items-center rounded-lg border border-gray-900">
            <div className="h-60 w-60 mx-auto rounded-full border border-gray-900 overflow-hidden">
              <img src="/principal.png" className="cover" alt="" />
            </div>
            <div className="flex-1">
              <div className="title py-4 px-2 text-center text-2xl font-bold text-gray-300">
                Principal
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
