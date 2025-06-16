import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

export default connectDB;
