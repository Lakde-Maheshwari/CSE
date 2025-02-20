import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaChalkboardTeacher, FaTrophy, FaRocket } from "react-icons/fa";
import FeatureGrid from "./FeatureCard";
import TestimonialFooter from "./Footer";
const Home = () => {
  const navigate = useNavigate();

  const handleJoinClick = () => {
    navigate("/join");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white w-full min-w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 w-full">
        <h1 className="text-5xl font-bold mb-4">Study Smarter, Together! 🚀</h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl">
          Join collaborative study groups, stay consistent with daily streaks, and make learning interactive with AI-powered tools.
        </p>
        <button
          onClick={handleJoinClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
        >
          Create New Meet +
        </button>

        {/* Features Section */}
       <FeatureGrid />
      </div>

      {/* Testimonials Section */}  
      <TestimonialFooter /> 
    </div>
  );
};

export default Home;
