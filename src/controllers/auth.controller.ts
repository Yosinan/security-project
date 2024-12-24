import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import speakeasy from "speakeasy"; // MFA
import qrcode from "qrcode"; // MFA

import { generateToken, verifyToken } from "../utils/jwt";
import {
  hashPassword,
  comparePassword,
  enforcePasswordPolicy,
} from "../services/auth.service"; 

import { logAction } from "../services/log.service"; 
import { fail } from "assert";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, name } = req.body;

  // check if user already exists
  const userExists = await prisma.user.findUnique({ where: { email } });

  if (userExists) {
    res.status(409).json({ message: "User already exists" });
    return;
  }

  if (!enforcePasswordPolicy(password)) {
    return res
      .status(400)
      .json({ error: "Password does not meet policy requirements.", policy: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
  }

  // hash password
  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name,
      },
    });

    if (!user) {
      res.status(500).json({ message: "Error creating user" });
      return;
    }

    // log user action
    await logAction(user.id, "User registered", req.ip);

    res.status(201).json({ message: "User created successfully", data: user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

// login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.isLocked && user.lockoutUntil && new Date() < user.lockoutUntil) {
      return res
        .status(403)
        .json({ error: "Account is locked. Try again later." });
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      const failedAttempts = user.failedLoginAttempts + 1;

      await prisma.user.update({
        where: { email },
        data: { failedLoginAttempts: failedAttempts },
      });

      if (failedAttempts >= 3) {
        await prisma.user.update({
          where: { email },
          data: {
            isLocked: true,
            lockoutUntil: new Date(Date.now() + 30 * 60 * 1000), // Lock for 30 minutes
          },
        });
      }

      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = req.body.token;

    if (user.mfaSecret) {
      const verified = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: "base32",
        token,
        window: 1,
      });

      if (!verified) {
        return res.status(401).json({ error: "Invalid MFA token." });
      }
    }

    await prisma.user.update({
      where: { email },
      data: { failedLoginAttempts: 0, isLocked: false, lockoutUntil: null },
    });

    const ip = req.headers["x-forwarded-for"] || req.ip;

    // log user action
    await logAction(user.id, "User logged in", ip);

    const authToken = generateToken(user.id);

    res
      .status(200)
      .json({ message: "Login successful", data: user, token: authToken });
  } catch (error: any) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};


// function to generate MFA secret
export const generateMfaSecret = async (req: Request, res: Response) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const url = speakeasy.otpauthURL({ secret: secret.base32, label: req.body.email, algorithm: 'sha512' });

  qrcode.toDataURL(url, (err: any, data_url: any) => {
    res.json({ secret: secret.base32, qrCode: data_url });
  });
};

// function to verify MFA token
export const verifyMfaToken = async (req: Request, res: Response) => {
  const { token, secret } = req.body;

  const verified = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
    window: 1,
  });

  if (verified) {
    res.json({ verified: true });
  } else {
    res.status(400).json({ error: 'Invalid token.' });
  }
};


// change password
export const changePassword = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const isPasswordValid = await comparePassword(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Old password is incorrect.' });
    }

    if (!enforcePasswordPolicy(newPassword)) {
      return res.status(400).json({ error: 'New password does not meet policy requirements.' });
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.json({ message: 'Password changed successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Password change failed.' });
  }
};

// update user
export const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    const updateduser = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });

    res
      .status(200)
      .json({ message: "user updated successfully", data: updateduser });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res
      .status(200)
      .json({ message: "users retrieved successfully", data: users });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// get user by id
export const getUserById = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    res
      .status(200)
      .json({ message: "user retrieved successfully", data: user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// delete user
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await prisma.user.delete({ where: { id: userId } });

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
