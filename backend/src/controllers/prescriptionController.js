import Prescription from "../models/Prescription.js";
import Appointment from "../models/Appointment.js";

export const createPrescription = async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      reportId,
      doctorId,
      doctorName,
      symptoms,
      heartRate,
      bp,
      oxygen,
      risk,
      diagnosis,
      prescription,
      recommendation,
      followUp,
      notes,
    } = req.body;

   if (!patientId || !appointmentId) {
  return res.status(400).json({
    message: "Patient and appointment details are required",
  });
}

    if (!diagnosis || !prescription) {
      return res.status(400).json({
        message: "Diagnosis and prescription are required",
      });
    }

    const finalPrescription = await Prescription.create({
      patientId,
      appointmentId,
      reportId,
      doctorId,
      doctorName,
      symptoms,
      heartRate,
      bp,
      oxygen,
      risk,
      diagnosis,
      prescription,
      recommendation,
      followUp,
      notes,
    });

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: "completed",
    });

    res.status(201).json({
      message: "Prescription saved successfully",
      prescription: finalPrescription,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find({
  patientId: req.user.id,
})
  .populate("patientId", "name email")
  .populate("doctorId", "name specialization")
  .sort({ createdAt: -1 });

    res.status(200).json(prescriptions);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};