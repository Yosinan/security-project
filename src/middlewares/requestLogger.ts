import { logAction } from "../services/log.service";
import { Request, Response, NextFunction } from "express";

// Request logger middleware
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.user);
  const userId = req.user?.id || null;
  logAction(userId, `Requested ${req.method} ${req.path}`, req.ip).catch(
    console.error
  );
  next();
};
