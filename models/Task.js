import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed"]
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"]
  },
  dueDate: Date,
  completedAt: Date,

  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" }

}, { timestamps: true });

export default mongoose.model("Task", taskSchema);