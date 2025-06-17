import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcryptjs";
import { InternalServerError } from "../utils/error";

/**
 * User model schema for MongoDB using Mongoose.
 * This schema defines the structure of user documents in the database.
 * It includes fields for email, password, first name, last name, and created date.
 * Passwords are hashed before saving to the database.
 */
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/**
 * Pre-save middleware to hash the password before saving the user document.
 * This ensures that passwords are stored securely in the database.
 * If the password is not modified, it skips hashing.
 * 
 * @param next - The next middleware function in the stack.
 */
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next(); // if they are not modifying the password, skip hashing
    try {
        const salt = await bcrypt.genSalt(10);
        this.password =  await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(InternalServerError("Error hashing password"));
    }
});

const User = mongoose.model("User", userSchema);
export default User;


