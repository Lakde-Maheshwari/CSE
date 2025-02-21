import { useEffect, useState } from "react";
import TaskList from "./tasklist";
// import CircularProgressTrackers from "./progresstrackers";
import ContactInfo from "./contactInfo";
import ProfileDetails from "./profiledetails";
import Header from "./header";
import Sidebar from "./sidebar";
import TestimonialFooter from "./Footer";
import axios from "axios";

const Profile = () => {
  const API_BASE_URL = "http://localhost:6471/api/profile";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  const user = userData ? JSON.parse(userData) : null;
  const userId = user ? user._id : null;

  useEffect(() => {
    if (!userId || !token) {
      console.error("User is not authenticated");
      setError("User is not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to fetch profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Sidebar />
      <div className="flex flex-col w-3/4 p-6 space-y-6">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-gray-700 bg-gray-800 rounded-xl shadow-2xl">
          <div className="p-6 flex flex-col items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            {loading ? (
              <p>Loading profile...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : profile ? (
              <ProfileDetails user={user} profile={profile} />
            ) : (
              <p>
                Profile not found. <a href="/createprofile" className="text-blue-400 underline">Create profile</a>
              </p>
            )}
            <ContactInfo />
          </div>
          <div className="grid grid-rows-2 gap-6">
            {/* <CircularProgressTrackers /> */}
            <TaskList />
          </div>
        </div>
        <div className="mt-auto">
          <TestimonialFooter />
        </div>
      </div>
    </div>
  );
};

export default Profile;
