import React, { useState } from "react";
import Button from "./button";
const TaskForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    status: "Pending"
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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
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

        <Button label="Add Task" onClick={handleSubmit} color="blue"></Button>
      </form>
    </div>
  );
};

export default TaskForm;
