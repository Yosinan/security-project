import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/user.controller";

const router = Router();

// Route to get user profile
router.get("/profile", getUserProfile);

// Route to update user profile
router.put("/profile", updateUserProfile);

// Route to delete user profile
router.delete("/profile", deleteUserProfile);

export default router;
