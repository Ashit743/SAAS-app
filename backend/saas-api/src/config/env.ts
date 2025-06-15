import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGODB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;