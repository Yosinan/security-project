import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const userProfile = await userService.getUserProfile(userId);
    return res.status(200).json(userProfile);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch user profile." });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedData = req.body;
    const updatedProfile = await userService.updateUserProfile(
      userId,
      updatedData
    );
    return res.status(200).json(updatedProfile);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update user profile." });
  }
};

export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    await userService.deleteUserProfile(userId);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete user profile." });
  }
};
