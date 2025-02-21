import React from "react";

const ProfileDetails = ({ user, profile }) => {
  return (
    <div className="w-full max-w-lg bg-gray-800/80 backdrop-blur-lg p-8 rounded-2xl text-center transform transition-all hover:shadow-2xl min-h-[450px] flex flex-col items-center justify-center">
      
      {/* Profile Picture */}
      <div className="relative w-48 h-48 mb-6">
        <img
          src={profile?.profilePicture || "/default-avatar.jpg"} // Fallback to default if empty
          alt="Profile"
          className="w-full h-full rounded-full border-4 border-gray-500 shadow-md"
        />
      </div>

      {/* Name & Bio */}
      <h2 className="text-3xl font-semibold text-white">{user?.name || "User Name"}</h2>
      <p className="text-gray-400 text-lg mt-2">{profile?.bio || "No bio available"}</p>

      {/* Achievements Section */}
      <div className="mt-4 w-full px-4">
        <h3 className="text-xl text-white font-semibold">Achievements</h3>
        {profile?.achievements?.length > 0 ? (
          <ul className="text-gray-300 text-sm mt-2">
            {profile.achievements.map((ach, index) => (
              <li key={index} className="mt-1">
                <strong>{ach.title}:</strong> {ach.description}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400 text-sm">No achievements yet</p>
        )}
      </div>

      {/* Statistics Section */}
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        <div className="bg-gray-700 p-4 rounded-xl">
          <p className="text-lg text-white font-semibold">{profile?.completedTasks || 0}</p>
          <p className="text-gray-400 text-sm">Completed Tasks</p>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl">
          <p className="text-lg text-white font-semibold">{profile?.streak || 0}</p>
          <p className="text-gray-400 text-sm">Streak Days</p>
        </div>

        <div className="bg-gray-700 p-4 rounded-xl">
          <p className="text-lg text-white font-semibold">{profile?.rewardPoints || user?.rewardPoints || 0}</p>
          <p className="text-gray-400 text-sm">Reward Points</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
