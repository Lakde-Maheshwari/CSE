import React from "react";
import TaskList from "./tasklist";
// import CircularProgressTrackers from "./progresstrackers";
import ContactInfo from "./contactInfo";
import ProfileDetails from "./profiledetails";
import Header from "./header";
import Sidebar from "./sidebar";
import TestimonialFooter from "./Footer";

const Profile = () => {
  return (
    <div className="flex min-h-screen w-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Sidebar />
      <div className="flex flex-col w-3/4 p-6 space-y-6">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border border-gray-700 bg-gray-800 rounded-xl shadow-2xl">
          <div className="p-6 bg-gray-700 flex flex-col items-center rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
            <ProfileDetails />
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
