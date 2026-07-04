import express from "express";
import {
  createReport,
  getMyReports
} from "../controllers/reportController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createReport
);

router.get(
  "/my-reports",
  authMiddleware,
  getMyReports
);

export default router;