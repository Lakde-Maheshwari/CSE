import { useState } from "react";
import axios from "axios";

const ProfileForm = ({ onSubmit }) => {
  const [profile, setProfile] = useState({
    bio: "",
    profilePicture: "",
    achievements: [],
    achievementTitle: "",
    achievementDescription: ""
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleAddAchievement = () => {
    if (profile.achievementTitle && profile.achievementDescription) {
      setProfile({
        ...profile,
        achievements: [
          ...profile.achievements,
          {
            title: profile.achievementTitle,
            description: profile.achievementDescription,
            date: new Date().toISOString()
          }
        ],
        achievementTitle: "",
        achievementDescription: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken"); // Assuming you store auth token
      const response = await axios.post(
        "http:localhost:6471/api/profile/create",
        {
          bio: profile.bio,
          profilePicture: profile.profilePicture,
          achievements: profile.achievements
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token if needed
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Profile updated:", response.data);
      onSubmit(response.data); // Call parent function if needed
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="max-w-lg w-full p-6 bg-gray-900 shadow-lg rounded-lg text-white">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold">Profile Picture URL</label>
            <input
              type="text"
              name="profilePicture"
              value={profile.profilePicture}
              onChange={handleChange}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
            />
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-semibold">Achievements</h3>
            {profile.achievements.map((ach, index) => (
              <div key={index} className="p-2 bg-gray-800 border border-gray-700 rounded-md mb-2">
                <p className="font-bold">{ach.title}</p>
                <p className="text-sm">{ach.description}</p>
                <p className="text-xs text-gray-400">{new Date(ach.date).toDateString()}</p>
              </div>
            ))}

            <div className="mt-2">
              <input
                type="text"
                name="achievementTitle"
                value={profile.achievementTitle}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white mb-2"
              />
              <textarea
                name="achievementDescription"
                value={profile.achievementDescription}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              />
              <button
                type="button"
                onClick={handleAddAchievement}
                className="mt-2 p-2 bg-blue-500 text-white rounded-md w-full"
              >
                Add Achievement
              </button>
            </div>
          </div>

          <button onClick={console.log("submitted successfully")}  type="submit" className="w-full p-2 bg-green-500 text-white rounded-md">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
