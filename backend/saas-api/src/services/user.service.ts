import { JWT_SECRET } from "../config/env";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { RegisterNewUser } from "../types/user.types";
import bcrypt from "bcryptjs";




export const registerUserService = async ({email, password, firstName, lastName}: RegisterNewUser) => {
    
    const existingUser = await User.findOne({ email }); 
    if (existingUser) {
      throw new Error("User with this email already exists");
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



    return { userResponse }; //same as {userResponse: userResponse, token: token}
}

export const loginUserService = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
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

