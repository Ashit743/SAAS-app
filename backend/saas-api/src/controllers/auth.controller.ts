import { Request, Response } from "express";
import {
  loginUserService,
  registerUserService,
} from "../services/local.service";

/**
 * Controller to handle user registration
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response with success message and user details
 * @throws {Error} If user registration fails
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { email, password, firstName, lastName } = req.body;
  const { userResponse } = await registerUserService({
    email,
    password,
    firstName,
    lastName,
  });
  return res.status(201).json({
    message: "User registered successfully",
    userResponse,
  });
};

/**
 * Controller to handle user login
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response with success message, token, and user details
 * @throws {Error} If login fails due to invalid credentials
 */
export const loginUser = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    const { userResponse, token } = await loginUserService(email, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res
      .status(200)
      .json({ message: "Login successful", token, userResponse });
};
