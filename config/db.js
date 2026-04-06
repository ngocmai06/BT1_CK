import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URI;
    
    await mongoose.connect(url);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Lỗi kết nối DB:", error.message);
    process.exit(1);
  }
};

export default connectDB;