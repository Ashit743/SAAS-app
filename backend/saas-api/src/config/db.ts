import mongoose from "mongoose";

import { MONGO_URI } from "./env";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Exit the process with failure
  }
}