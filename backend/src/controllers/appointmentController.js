import Appointment from "../models/Appointment.js";
import Doctor from "../models/Doctor.js";

export const createAppointment = async (req, res) => {
  try {
    const {
      doctorId,
      doctorName,
      slot,
      appointmentType,
      reportId,
    } = req.body;

    if (!doctorId || !doctorName || !slot || !appointmentType) {
      return res.status(400).json({
        message: "Doctor, slot and appointment type are required",
      });
    }

    const appointment = await Appointment.create({
      patientId: req.user.id,
      doctorId,
      doctorName,
      slot,
      appointmentType,
      reportId: reportId || undefined,
    });

    res.status(201).json({
      message: "Appointment Booked Successfully",
      appointment,
    });
  } catch (error) {
    console.log("CREATE APPOINTMENT ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getDoctorAppointments = async (req, res) => {
  try {
    if (req.user.role !== "doctor") {
      return res.status(403).json({
        message: "Only doctors can view doctor appointments",
      });
    }

    const doctor = await Doctor.findOne({
      userId: req.user.id,
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor profile not found",
      });
    }

    const appointments = await Appointment.find({
      doctorId: doctor._id,
    })
      .populate("patientId", "name email phone")
      .populate(
        "reportId",
        "symptoms heartRate bp oxygen riskLevel reportFile status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.log("GET DOCTOR APPOINTMENTS ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    if (req.user.role !== "patient") {
      return res.status(403).json({
        message: "Only patients can view their appointments",
      });
    }

    const appointments = await Appointment.find({
      patientId: req.user.id,
    })
      .populate("doctorId", "name specialization profileImage")
      .populate(
        "reportId",
        "symptoms heartRate bp oxygen riskLevel reportFile status"
      )
      .sort({ createdAt: -1 });

    res.status(200).json(appointments);
  } catch (error) {
    console.log("GET MY APPOINTMENTS ERROR:", error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};