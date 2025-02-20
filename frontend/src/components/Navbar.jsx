import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="bg-gray-800 text-white shadow-md w-screen">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <Link
              to="/home"
              className="hover:text-teal-400 transition duration-300"
            >
              My App
            </Link>
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>

          {/* Navigation Links */}
          <ul
            className={`md:flex space-x-8 ${
              isOpen ? "block" : "hidden"
            } md:space-x-8 md:items-center absolute md:static bg-gray-800 w-full md:w-auto left-0 px-6 py-4 md:p-0`}
          >
            <li>
              <Link
                to="/home"
                className="block hover:text-teal-400 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="block hover:text-teal-400 transition duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="block hover:text-teal-400 transition duration-300"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
