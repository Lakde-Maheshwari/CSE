import { motion } from "framer-motion";
import { FaUsers, FaChalkboardTeacher, FaTrophy, FaRocket } from "react-icons/fa";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center text-center space-y-4"
    >
      <div className="text-4xl text-blue-500">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

const FeatureGrid = () => {
  return (
    <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-none px-4">
      <FeatureCard icon={<FaUsers />} title="Real-Time Collaboration" description="Work together with live whiteboards and discussions." />
      <FeatureCard icon={<FaChalkboardTeacher />} title="Interactive Learning" description="Use polls, quizzes, and shared notes to enhance learning." />
      <FeatureCard icon={<FaTrophy />} title="Rewards & Streaks" description="Stay motivated with daily streaks and achievements." />
      <FeatureCard icon={<FaRocket />} title="AI Study Assistant" description="Get personalized task suggestions and study reminders." />
    </div>
  );
};

export default FeatureGrid;
