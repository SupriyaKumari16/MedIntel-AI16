import React, { useEffect, useRef, useState } from "react";
import { FaPhone } from "react-icons/fa";
import useIncomingCall from "../hooks/useIncomingCall";
import ringtone from "../../assets/ringtone/incoming-call.mp3"; 
import { useNavigate } from "react-router-dom";
import { useSocket } from "../providers/SocketProvider";

export default function IncomingCallModal() {
  const navigate = useNavigate();
  const socket = useSocket();
  const callContext = useIncomingCall();

  const [seconds, setSeconds] = useState(0);
  const audioRef = useRef(null);

  if (!callContext) {
    return null;
  }

  const {
    incomingCall,
    isRinging,
    clearIncomingCall,
  } = callContext;

  const acceptCall = () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  if (socket && incomingCall) {
    socket.emit("accept-call", {
      appointmentId: incomingCall.appointmentId,
      doctorId: incomingCall.doctorId,
      patientId: incomingCall.patientId,
    });
  }

  const callData = incomingCall;

  clearIncomingCall();

  setTimeout(() => {
    navigate("/video-call", {
      state: callData,
    });
  }, 200);
};

  const rejectCall = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    if (socket && incomingCall) {
      socket.emit("reject-call", {
        appointmentId: incomingCall.appointmentId,
        doctorId: incomingCall.doctorId,
        patientId: incomingCall.patientId,
      });
    }

    clearIncomingCall();
  };

  useEffect(() => {
    if (!isRinging) return;

    setSeconds(0);

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRinging]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isRinging) {
      audioRef.current.loop = true;
      audioRef.current
        .play()
        .catch((err) => console.log("Audio Play Error:", err));
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isRinging]);

  if (!isRinging || !incomingCall) return null;

  const timer = `00:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl text-center">

        <div className="relative flex justify-center">

          <div className="absolute h-44 w-44 rounded-full bg-teal-300 opacity-10 animate-ping"></div>

          <div className="absolute h-36 w-36 rounded-full bg-teal-300 opacity-20 animate-pulse"></div>

          <div className="absolute h-28 w-28 rounded-full bg-teal-300 opacity-30"></div>

          <img
            src={
              incomingCall.doctorImage ||
              "https://i.pravatar.cc/200?img=44"
            }
            alt="Doctor"
            className="relative z-10 h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
          />

        </div>

        <h2 className="mt-14 text-2xl font-bold text-gray-800">
          {incomingCall.doctorName}
        </h2>

        <p className="mt-2 text-teal-600 font-semibold">
          {incomingCall.specialization || "General Physician"}
        </p>

        <div className="mt-3 flex justify-center">
          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            ✔ Verified Doctor
          </span>
        </div>

        <p className="mt-6 text-lg font-semibold text-gray-700">
          Incoming Video Consultation
        </p>

        <p className="mt-2 text-gray-500">
          Your doctor is calling you...
        </p>

        <p className="mt-3 text-base font-semibold text-teal-600">
          Ringing... {timer}
        </p>

        <div className="mt-10 flex justify-center gap-12">

          {/* Reject */}

          <button
            onClick={rejectCall}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-red-600"
          >
            <FaPhone className="rotate-[225deg] text-xl text-white" />
          </button>

          {/* Accept */}

          <button
            onClick={acceptCall}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-xl transition-all duration-300 hover:scale-110 hover:bg-green-600"
          >
            <FaPhone className="rotate-[225deg] text-xl text-white" />
          </button>

        </div>

      </div>

      <audio ref={audioRef} src={ringtone} />

    </div>
  );
}