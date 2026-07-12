import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import caseRoutes from "./routes/caseRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
import chatHistoryRoutes from "./routes/chatHistoryRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import finalAiRoutes from "./routes/finalAiRoutes.js";

dotenv.config();
console.log("Gemini Key Exists:", !!process.env.GEMINI_API_KEY);

connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cases", caseRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/chat-history", chatHistoryRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/final-ai", finalAiRoutes);

app.get("/", (req, res) => {
  res.send("MedIntel Backend Running 🚀");
});

const server = http.createServer(app);
const connectedUsers = new Map();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("register-user", ({ userId, role }) => {
  if (!userId) return;

  connectedUsers.set(userId, {
    socketId: socket.id,
    role,
  });

  console.log(`${role} Registered : ${userId}`);
});

socket.on("incoming-call", (callData) => {
  if (!callData?.patientId) return;
  const patient = connectedUsers.get(callData.patientId);

  if (!patient) {
    socket.emit("patient-offline");
    return;
  }

  io.to(patient.socketId).emit("incoming-call", callData);

  console.log(
    `Incoming call sent to patient ${callData.patientId}`
  );
});

socket.on("accept-call", (callData) => {
  console.log("ACCEPT CALL RECEIVED");
  console.log("========== ACCEPT CALL ==========");
  console.log(callData);

  const doctor = connectedUsers.get(callData.doctorId);

  console.log("Doctor Found:", doctor);

  if (!doctor) {
    console.log("❌ Doctor NOT FOUND");
    return;
  }

  console.log("📤 Sending call-accepted to:", doctor.socketId);

  io.to(doctor.socketId).emit("call-accepted", callData);

  console.log("✅ call-accepted emitted");
});

socket.on("reject-call", (callData) => {
  const doctor = connectedUsers.get(callData.doctorId);

  if (!doctor) return;

  io.to(doctor.socketId).emit("call-rejected", callData);
});

socket.on("cancel-call", (callData) => {
  const patient = connectedUsers.get(callData.patientId);

  if (!patient) return;

  io.to(patient.socketId).emit("call-cancelled");
});

socket.on("call-ended", (callData) => {
  const patient = connectedUsers.get(callData.patientId);

  const doctor = connectedUsers.get(callData.doctorId);

  if (patient) {
    io.to(patient.socketId).emit("call-ended");
  }

  if (doctor) {
    io.to(doctor.socketId).emit("call-ended");
  }
});

  console.log("Socket connected:", socket.id);

  socket.on("join-call-room", (appointmentId) => {
    if (!appointmentId) return;

    const roomName = `appointment-${appointmentId}`;

    socket.join(roomName);

    console.log(`Socket ${socket.id} joined ${roomName}`);

    const clientsInRoom = io.sockets.adapter.rooms.get(roomName);

    const clientCount = clientsInRoom ? clientsInRoom.size : 0;

    if (clientCount === 2) {
      io.to(roomName).emit("call-user-joined");
    }

    if (clientCount > 2) {
      socket.emit("call-room-full");
    }
  });

  socket.on("webrtc-offer", ({ appointmentId, offer }) => {
    socket
      .to(`appointment-${appointmentId}`)
      .emit("webrtc-offer", offer);
  });

  socket.on("webrtc-answer", ({ appointmentId, answer }) => {
    socket
      .to(`appointment-${appointmentId}`)
      .emit("webrtc-answer", answer);
  });

  socket.on("webrtc-ice-candidate", ({ appointmentId, candidate }) => {
    socket
      .to(`appointment-${appointmentId}`)
      .emit("webrtc-ice-candidate", candidate);
  });

  socket.on("leave-call-room", (appointmentId) => {
    if (!appointmentId) return;

    const roomName = `appointment-${appointmentId}`;

    socket.leave(roomName);

    socket.to(roomName).emit("call-user-left");

    console.log(`Socket ${socket.id} left ${roomName}`);
  });

  socket.on("disconnect", () => {
  for (const [userId, user] of connectedUsers.entries()) {
    if (user.socketId === socket.id) {
      connectedUsers.delete(userId);

      console.log(`${user.role} Disconnected : ${userId}`);

      break;
    }
  }

  console.log("Socket disconnected:", socket.id);
});
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
  console.log("Socket.io server ready 🚀");
});