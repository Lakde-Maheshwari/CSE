import React from "react";

const ProfileDetails = () => {
  return (
    <div className="w-full max-w-lg bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl text-center transform transition-all hover:shadow-2xl min-h-[450px] flex flex-col items-center justify-center">
      {/* Profile Picture */}
      <div className="relative w-48 h-48 mb-6"> {/* Increased image size */}
        <img
          src="/myphoto.jpg" // Replace with actual profile picture URL
          alt="Profile"
          className="w-full h-full rounded-full border-4 border-gray-500 shadow-md"
        />
      </div>

      {/* Name & Role */}
      <h2 className="text-3xl font-semibold text-white">John Doe</h2>
      <p className="text-gray-400 text-lg mt-2">Software Engineer | Tech Enthusiast</p>
    </div>
  );
};

export default ProfileDetails;
