import { Request, Response, NextFunction } from "express";
import { RecaptchaV2 } from "express-recaptcha";

require("dotenv").config();

const recaptcha = new RecaptchaV2(
  process.env.RECAPTCHA_SITE_KEY as string,
  process.env.RECAPTCHA_SECRET_KEY as string
);

export const captchaMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  recaptcha.verify(req, (error, data) => {
    if (error) {
      return res.status(400).json({ error: "Invalid captcha." });
    }
    next();
  });
};
