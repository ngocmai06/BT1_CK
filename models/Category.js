import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  isDeleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);