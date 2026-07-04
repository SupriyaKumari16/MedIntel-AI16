import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
    },

    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Report",
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    //   required: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    symptoms: {
      type: String,
      default: "",
    },

    heartRate: {
      type: String,
      default: "N/A",
    },

    bp: {
      type: String,
      default: "N/A",
    },

    oxygen: {
      type: String,
      default: "N/A",
    },

    risk: {
      type: String,
      default: "pending",
    },

    diagnosis: {
      type: String,
      required: true,
    },

    prescription: {
      type: String,
      required: true,
    },

    recommendation: {
      type: String,
      default: "",
    },

    followUp: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Prescription", prescriptionSchema);