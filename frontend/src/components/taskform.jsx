import React, { useState } from "react";
import Button from "./button";
import { motion } from "framer-motion";

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
      {/* Right Side - Form Section */}
      <div className="w-1/2 flex justify-center items-center bg-black bg-opacity-50">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 w-4/5 h-4/5 flex flex-col justify-center"
        >
          <div className="flex flex-col items-center">
            <label className="block text-white text-left w-3/4">
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

            <label className="block text-white text-left w-3/4 mt-3">
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

            <label className="block text-white text-left w-3/4 mt-3">
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
          </div>

          <div className="mt-5 flex justify-center">
            <Button label="Add Task" type="submit" />
          </div>
        </motion.form>
      </div>

      {/* Right Side - Image Section */}
      <div className="w-1/2 flex justify-center items-center bg-gray-900">
        <motion.img
          src="/task image.jpg"
          alt="Task Illustration"
          className="max-w-full max-h-full rounded-lg shadow-lg"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 1.5, 
            ease: "easeInOut",
          }}
          whileHover={{
            rotateX: [0, 15, -15, 10, -10, 0], 
            rotateY: [0, 10, -10, 5, -5, 0], 
            scale: 1.1, 
            filter: "drop-shadow(0px 0px 15px rgba(255,255,255,0.6))",
          }}
        />

      </div>
    </div>
  );
};

export default TaskForm;
