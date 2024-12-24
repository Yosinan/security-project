import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "🚀 Server is up and running" });
});


export default router;
