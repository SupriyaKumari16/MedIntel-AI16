import React, { useState, useEffect, useRef } from "react";
import { FaPhone } from "react-icons/fa";
import useCalling from "../hooks/useCalling";
import { useSocket } from "../providers/SocketProvider";
import ringtone from "../../assets/ringtone/incoming-call.mp3";

export default function CallingModal() {
  const socket = useSocket();

  const {
    callingPatient,
    isCalling,
    stopCalling,
  } = useCalling();

  const [seconds, setSeconds] = useState(0);
  const [callStatus, setCallStatus] = useState("ringing"); 
// "ringing", "accepted", "rejected", "timeout"
  
  const audioRef = useRef(null);
  const timerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Initialize ringtone audio
  useEffect(() => {
    if (isCalling && callingPatient) {
      audioRef.current = new Audio(ringtone); // Adjust path if your asset is located elsewhere
      audioRef.current.loop = true;
      
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked by browser autoplay policy:", err);
      });

      // Reset states
      setSeconds(0);
      setCallStatus("ringing");

      // 1. Live Timer Interval
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      // 4. 30-second Timeout
      timeoutRef.current = setTimeout(() => {
        cleanupCallEffects();
        socket.emit("call-timeout", {
  patientId: callingPatient.patientId,
  doctorId: callingPatient.doctorId,
});
        setCallStatus("rejected");

        // 5. Close modal after 2 seconds on timeout
        setTimeout(() => {
          stopCalling();
        }, 2000);
      }, 30000);
    }

    return () => {
      cleanupCallEffects();
    };
  }, [isCalling, callingPatient, socket, stopCalling]);

  // Listen for external call updates from the socket to stop ringtone / handle spinner
  useEffect(() => {
    if (!socket || !isCalling) return;

   const handleCallAccepted = () => {
  cleanupCallEffects();

  setCallStatus("accepted");

  setTimeout(() => {
    stopCalling();
  }, 1000);
};

   const handleCallRejected = () => {
  cleanupCallEffects();

  setCallStatus("timeout");

  setTimeout(() => {
    stopCalling();
  }, 1500);
};

    socket.on("call-accepted", handleCallAccepted);
    socket.on("call-rejected", handleCallRejected);

    return () => {
      socket.off("call-accepted", handleCallAccepted);
      socket.off("call-rejected", handleCallRejected);
    };
 }, [socket, isCalling, stopCalling]); 

  // Clean timers and stop audio safely
  const cleanupCallEffects = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  if (!isCalling || !callingPatient) return null;

  // 3. Stop ringtone on doctor cancel
  const cancelCall = () => {
    cleanupCallEffects();

    socket.emit("cancel-call", {
      patientId: callingPatient.patientId,
      doctorId: callingPatient.doctorId,
    });

    stopCalling();
  };

  // Helper to format the live timer string
  const formatTime = (totalSeconds) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-[420px] rounded-3xl bg-white p-8 text-center shadow-2xl">

        <div className="relative flex justify-center">

          <div className="absolute h-44 w-44 rounded-full bg-teal-300 opacity-10 animate-ping"></div>

          <div className="absolute h-36 w-36 rounded-full bg-teal-300 opacity-20 animate-pulse"></div>

          <div className="absolute h-28 w-28 rounded-full bg-teal-300 opacity-30"></div>

          <img
           src={
  callingPatient.img ||
  "https://i.pravatar.cc/200?img=5"
}
            alt="Patient"
            className="relative z-10 h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl"
          />

        </div>

        <h2 className="mt-14 text-2xl font-bold">
          {callingPatient.name}
        </h2>

        {/* Live Timer Render */}
        <div className="mt-2 text-sm font-mono text-gray-400">
          {formatTime(seconds)}
        </div>

        {/* Contextual Status Subtitles */}
        {callStatus === "ringing" && (
          <>
            <p className="mt-3 text-gray-500">
              Calling Patient...
            </p>
            <p className="mt-3 text-teal-600 font-semibold animate-pulse">
              Ringing...
            </p>
          </>
        )}

        {callStatus === "accepted" && (
          <div className="mt-4 flex flex-col items-center justify-center gap-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-teal-600 border-t-transparent"></div>
            <p className="text-teal-600 font-semibold">Connecting...</p>
          </div>
        )}
{callStatus === "rejected" && (
  <p className="mt-5 text-red-500 font-semibold">
    Patient declined the call.
  </p>
)}

{callStatus === "timeout" && (
  <p className="mt-5 text-red-500 font-semibold">
    Patient did not answer.
  </p>
)}

        <button
          onClick={cancelCall}
          className="mt-10 h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 transition shadow-xl"
        >
          <FaPhone className="mx-auto rotate-[225deg] text-xl text-white" />
        </button>

      </div>

    </div>
  );
}