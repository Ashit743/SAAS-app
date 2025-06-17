import { JWT_SECRET } from "../config/env";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { RegisterNewUser } from "../types/user.types";
import bcrypt from "bcryptjs";
import { Conflict, NotFound, Unauthorized } from "../utils/error";




export const registerUserService = async ({email, password, firstName, lastName}: RegisterNewUser) => {
    
    const existingUser = await User.findOne({ email }); 
    if (existingUser) {
      throw Conflict("User already exists with this email");
    }
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });
    await newUser.save();
    // Create a response object without the password
    const userResponse = {
      id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
    return { userResponse };
}

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw NotFound("User not found with this email");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw Unauthorized("Invalid password");
  }
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set");
  }
  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "7d", // Token expiration time
  });
  // Create a response object without the password
  const userResponse = {
    id: user._id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
  return { userResponse, token };
};

