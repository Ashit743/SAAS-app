import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcryptjs";
import { InternalServerError } from "../utils/error";


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


