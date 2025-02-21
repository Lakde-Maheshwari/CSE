const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  description: { type: String, required: true }, 
  status: { type: String, enum: ["pending", "in-progress", "completed"], default: "pending" },
  deadline: { type: Date, required: true }
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
