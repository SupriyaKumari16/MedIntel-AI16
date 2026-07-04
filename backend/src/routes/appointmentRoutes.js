import express from "express";

import {
  createAppointment,
  getDoctorAppointments,
  getMyAppointments,
} from "../controllers/appointmentController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  authMiddleware,
  createAppointment
);

router.get(
  "/doctor-appointments",
  authMiddleware,
  getDoctorAppointments
);

router.get(
  "/my-appointments",
  authMiddleware,
  getMyAppointments
);

export default router;