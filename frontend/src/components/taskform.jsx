import React, { useState } from "react";
import Button from "./button";
import {motion} from "framer-motion";

const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    status: "Completed",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.date && formData.name) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 flex">
      {/* right Side - form Section */}
      <div className="w-1/2 flex justify-center items-center bg-black bg-opacity-50">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-96"
        >
          <label className="block text-white text-left">
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
              required
            />
          </label>

          <label className="block text-white text-left">
            Task Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
              required
            />
          </label>

          <label className="block text-white text-left">
            Status:
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
            >
              <option value="Pending">Pending</option>
              <option value="Pursued">Pursued</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          
          <div className="mt-3">
            <Button label="Add Task" type="submit" />
          </div>
        </form>
      </div>

      {/* Right Side - image Section */}

      <div className="w-1/2 flex justify-center items-center bg-gray-900">
        <motion.img
          src="/task image.jpg"
          alt="Task Illustration"
          className="max-w-full max-h-full rounded-lg shadow-lg"
          whileHover={{
            rotateX: [0, 15, -15, 10, -10, 0], // Tilt forward & backward
            rotateY: [0, 10, -10, 5, -5, 0], // Rotate side to side
            scale: 1.1, // Slight scale-up
            filter: "drop-shadow(0px 0px 15px rgba(255,255,255,0.6))",
          }}
          transition={{
            duration: 1.5, // Smooth looping effect
            ease: "easeInOut",
            repeat: Infinity, // Keep moving continuously while hovered
          }}
        />
      </div>
    </div>
  );
};

export default TaskForm;
