import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Đảm bảo đã load file .env

export const connectDB = async () => {
  const dbUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/BT1_CK";

  try {
    await mongoose.connect(dbUri);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;