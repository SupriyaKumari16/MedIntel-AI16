import express from "express";
import {
  createCase,
  getMyCases
} from "../controllers/caseController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createCase
);

router.get(
  "/my-cases",
  authMiddleware,
  getMyCases
);

export default router;