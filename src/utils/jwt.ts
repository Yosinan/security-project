import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET as string;

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "1h" });
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, jwtSecret);
};
