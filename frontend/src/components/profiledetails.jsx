import React from "react";

const ProfileDetails = () => {
  return (
    <div className="w-full max-w-md bg-gray-800/80 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-600 text-center transform transition-all hover:shadow-2xl">
      {/* Profile Picture */}
      <div className="relative w-24 h-24 mx-auto mb-4">
        <img
          src="/myphoto.jpg" // Replace with actual profile picture URL
          alt="Profile"
          className="w-full h-full rounded-full border-4 border-gray-500 shadow-md"
        />
      </div>

      {/* Name & Role */}
      <h2 className="text-2xl font-semibold text-white">John Doe</h2>
      <p className="text-gray-400 text-sm">Software Engineer | Tech Enthusiast</p>

      {/* Stats Section */}
      <div className="mt-4 flex justify-around text-sm text-gray-300">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-white">120</span>
          <span>Tasks Completed</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold text-white">15</span>
          <span>Projects</span>
        </div>
      </div>

      {/* Profile Actions */}
      <div className="mt-6 space-x-4">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition-all rounded-lg text-white font-medium shadow-md">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-all rounded-lg text-white font-medium shadow-md">
          Settings
        </button>
      </div>
    </div>
  );
};

export default ProfileDetails;
