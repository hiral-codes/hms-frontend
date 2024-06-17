import React from "react";
import { FaInstagram, FaDiscord } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsDiscord } from "react-icons/bs";

function About() {
  return (
    <section className="bg-black">
      <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-2 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Meet Our Team
          </h2>
          <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
            Meet incridable team behind HostelMate. our diverse group of
            proffesionals brings a wealth of knowledge, skills and passion to
            the table, all with a shared commitment to achiving our common
            goals.
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="w-full max-h-44 object-contain rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="/hiral.jpg"
                alt="Hiral Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Hiral Patel</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                MERN Stack Developer
              </span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Specializing in MongoDB, Express.js, React, and Node.js.
                Passionate about creating dynamic web applications{" "}
              </p>
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <BsDiscord />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaSquareXTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="w-full max-h-44 object-contain rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="jetal.jpg"
                alt="Jetal Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Jetal Patel</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                Frontend Developer
              </span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Frontend Developer with a knack for crafting intuitive and
                responsive user interfaces. With a deep understanding of React.
              </p>
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <BsDiscord />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaSquareXTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="w-full max-h-44 object-contain rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="zeel.jpg"
                alt="Zeel Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Zeel Tank</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                UI/UX Designer
              </span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Creative UI/UX Designer dedicated to crafting visually stunning
                and user-friendly designs
              </p>
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <BsDiscord />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaSquareXTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="w-full max-h-44 object-contain rounded-lg sm:rounded-none sm:rounded-l-lg"
                src="lonika.jpg"
                alt="lonika Avatar"
              />
            </a>
            <div className="p-5">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">Lonika Patel</a>
              </h3>
              <span className="text-gray-500 dark:text-gray-400">
                Technical Writer
              </span>
              <p className="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                Simplifying complex concepts into clear, concise documentation.
                With a passion for effective communication.
              </p>
              <ul className="flex space-x-4 sm:mt-0">
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <BsDiscord />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  >
                    <FaSquareXTwitter />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
