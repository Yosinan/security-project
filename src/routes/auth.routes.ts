import express from "express";
import * as authController from "../controllers/auth.controller";
// import { captchaMiddleware } from "../middlewares/captcha";
// import { requestLogger } from "../middlewares/requestLogger";

const router = express.Router();

// User authentication routes
router.post("/register",  authController.createUser);
router.post("/login", authController.login);
router.post("/mfa/generate", authController.generateMfaSecret);
router.post("/mfa/verify", authController.verifyMfaToken);
router.post('/change-password', authController.changePassword);
router.get("/users", authController.getUsers);
router.put("/update/:userId", authController.updateUser);
router.delete("/delete/:userId", authController.deleteUser);


export default router;