import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { analyzeFinalAI } from "../controllers/finalAiController.js";

const router = express.Router();

router.post(
  "/analyze-final",
  authMiddleware,
  analyzeFinalAI
);

export default router;