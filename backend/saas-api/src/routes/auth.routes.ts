import express from "express";
import { handleGoogleCallback, loginUser, redirectToGoogle, registerUser } from "../controllers/auth.controller";

const router = express.Router();

// Define routes for user authentication
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/google",redirectToGoogle);
router.get("/auth/google/callback", handleGoogleCallback); 
export default router;
