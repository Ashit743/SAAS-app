import express from "express";
const router = express.Router();
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

router.post("/register", async (req, res): Promise<any> => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email }); // changed from find to findOne
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
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

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET environment variable is not set");
    }
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
        expiresIn: "7d", // Token expiration time
    });

    return res
      .status(201)
      .json({ message: "User registered successfully", user: userResponse, token });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Something went wrong",
        error: error instanceof Error ? error.message : String(error),
      });
  }
});

export default router;
