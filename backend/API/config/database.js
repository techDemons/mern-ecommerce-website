import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ Failure in DB connection:", error.message);
    process.exit(1); // Exit process if DB fails
  }
};

export { connectDB };
