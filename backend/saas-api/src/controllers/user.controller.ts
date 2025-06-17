import { Request, Response } from "express";
import { loginUserService, registerUserService } from "../services/user.service";

/**
 * Controller to handle user registration
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response with user details and token or error message
 */
export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const {userResponse } = await registerUserService({
      email,password, firstName, lastName
    });

    return res
      .status(201)
      .json({
        message: "User registered successfully",
        userResponse });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

/**
 * Controller to handle user login
 * @param req - Express request object
 * @param res - Express response object
 * @returns JSON response with user details and token or error message
 */
export const loginUser = async (req: Request, res: Response): Promise<any> => {
  try {
    // Implement login logic here
    const { email, password } = req.body;
    const { userResponse, token } = await loginUserService(email, password);
    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    return res.status(200).json({ message: "Login successful", token, userResponse });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : String(error),
    });
  }
}


