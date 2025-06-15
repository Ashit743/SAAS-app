import { Request, Response } from "express";
import { registerUserService } from "../services/user.service";

export const registerUser = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const {userResponse,token } = await registerUserService({
      email,password, firstName, lastName
    });

    return res
      .status(201)
      .json({
        message: "User registered successfully",
        user: userResponse,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
