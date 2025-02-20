import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fadeIn backdrop-filter backdrop-blur-sm">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="email" placeholder="Email" className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input type="password" placeholder="Password" className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md font-semibold transition duration-300">
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
