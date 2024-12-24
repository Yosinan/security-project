import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRole = async (req: Request, res: Response) => {
  const { name, permissions } = req.body;
  try {
    const role = await prisma.role.create({
      data: {
        name,
        permissions,
      },
    });

    if (!role) {
      res.status(500).json({ message: "Error creating role" });
      return;
    }

    return role;
  } catch (error: any) {
    console.error("Error creating role:", error);
    return null;
  }
};

// assign role
export const assignRole = async (req: Request, res: Response) => {
  const { userId, roleId } = req.body;

  try {
    const userRole = await prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });

    res
      .status(200)
      .json({ message: "Role assigned successfully", data: userRole });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error assigning role", error: error.message });
  }
};

export const updateRolePermissions = async (req: Request, res: Response) => {
  const { roleId, permissions } = req.body;
  try {
    const role = await prisma.role.update({
      where: { id: roleId },
      data: {
        permissions,
      },
    });

    res.status(200).json({ message: "Role updated successfully", data: role });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error updating role", error: error.message });
  }
};

export const getRoles = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const roles = await prisma.userRole.findMany({
      where: { userId },
      include: { role: true },
    });

    res.status(200).json({ message: "User roles", data: roles });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Error getting user roles", error: error.message });
  }
};
