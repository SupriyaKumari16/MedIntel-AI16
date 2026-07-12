import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { analyzeInitialAI } from "../controllers/aiController.js";

const router = express.Router();

router.post(
  "/analyze-initial",
  authMiddleware,
  analyzeInitialAI
);

export default router;