import { useEffect, useState } from "react";
import TaskList from "./tasklist";
// import CircularProgressTrackers from "./progresstrackers";
import ContactInfo from "./contactInfo";
import ProfileDetails from "./profiledetails";
import Header from "./header";
import Sidebar from "./sidebar";
import TestimonialFooter from "./Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const API_BASE_URL = "http://localhost:6471/api/profile";
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For redirection

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    const user = userData ? JSON.parse(userData) : null;
    const userId = user ? user._id : null;

    if (!userId || !token) {
      console.error("User is not authenticated");
      navigate("/login"); // Redirect immediately
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

        if (error.response) {
          if (error.response.status === 401) {
            navigate("/login"); // Redirect immediately if session expired
          } else if (error.response.status === 404) {
            setError("Profile not found. Please create one.");
          } else {
            setError("Failed to fetch profile. Try again later.");
          }
        } else {
          setError("Network error. Check your connection.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]); // Only re-run on mount

  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Sidebar />
      <div className="flex flex-col w-3/4 p-6 space-y-6">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-gray-700 bg-gray-800 rounded-xl shadow-2xl">
          <div className="p-6 flex flex-col items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            {loading ? (
              <div className="text-center">
                <p className="animate-spin text-xl">🔄 Loading profile...</p>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : profile ? (
              <ProfileDetails user={JSON.parse(localStorage.getItem("user"))} profile={profile} />
            ) : (
              <p>
                Profile not found.{" "}
                <a href="/createprofile" className="text-blue-400 underline">
                  Create profile
                </a>
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
