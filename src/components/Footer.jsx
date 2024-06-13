import React from "react";
import { FaDiscord, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/4 text-center md:text-left mb-6 md:mb-0">
            <h5 className="uppercase font-bold">HostelMate</h5>
            <p className="text-sm text-gray-500 mt-2">
              Simplifying hostel leave management.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              &copy; 2024 HostelMate. All rights reserved.
            </p>
          </div>
          <div className="w-full md:w-1/2 text-center mt-4 md:mt-0">
            <div className="flex justify-center md:justify-end">
              <a
                href="#"
                className="ml-4 text-gray-500 hover:text-white transition duration-300 text-sm"
              >
                About Us
              </a>
              <a
                href="#"
                className="ml-4 text-gray-500 hover:text-white transition duration-300 text-sm"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="ml-4 text-gray-500 hover:text-white transition duration-300 text-sm"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="ml-4 text-gray-500 hover:text-white transition duration-300 text-sm"
              >
                Terms of Service
              </a>
            </div>
            <div className="flex justify-center md:justify-end mt-4">
              <a
                href="#"
                className="text-gray-500 hover:text-white transition duration-300"
              >
                <FaDiscord className="text-3xl mx-2" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition duration-300"
              >
                <FaWhatsapp className="text-3xl mx-2" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition duration-300"
              >
                <FaX className="text-3xl mx-2" />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-white transition duration-300"
              >
                <FaLinkedin className="text-3xl mx-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
