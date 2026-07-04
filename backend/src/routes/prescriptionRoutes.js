import express from "express";
import {
  createPrescription,
  getMyPrescriptions,
} from "../controllers/prescriptionController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createPrescription);

router.get("/my-prescriptions", authMiddleware, getMyPrescriptions);

export default router;