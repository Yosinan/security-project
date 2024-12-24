import express from "express";
import * as roleService from "../services/role.service";
import { authenticate } from "../middlewares/authenticate";
// import { requestLogger } from "../middlewares/requestLogger";

const router = express.Router();

router.post("/create", roleService.createRole);
router.post("/assign", roleService.assignRole);
router.put("/update", roleService.updateRolePermissions);
router.get("/", roleService.getRoles);

export default router;
