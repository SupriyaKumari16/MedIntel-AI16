import React, { useEffect, useRef, useState } from "react";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhone,
  FaDesktop,
} from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSocket } from "../../videocall/providers/SocketProvider";

// const SOCKET_URL = "http://localhost:5000";

export default function VideoCallPage() {
   console.log("VIDEO CALL PAGE RENDERED");
  const navigate = useNavigate();
  const location = useLocation();
  const socket = useSocket();

  const patient =
    location.state ||
    JSON.parse(localStorage.getItem("currentPatient"));

  const mainVideoRef = useRef(null);
  const smallVideoRef = useRef(null);

  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [callStatus, setCallStatus] = useState("Connecting...");

  // New UI States
  const [timer, setTimer] = useState(0);
  const [remoteVideoLoaded, setRemoteVideoLoaded] = useState(false);

  const appointmentId =
    patient?.appointmentId ||
    patient?._id ||
    null;

  const isDoctor =
    JSON.parse(localStorage.getItem("user"))?.role === "doctor";

  // Extract display names dynamically for the professional header
  const user = JSON.parse(localStorage.getItem("user"));
  const counterpartName = isDoctor 
    ? (patient?.name || "Patient") 
    : (patient?.doctorName || "Doctor");

  // Format call duration into MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Live call duration timer hook
  useEffect(() => {
    console.log("USE EFFECT STARTED");
console.log("Appointment:", appointmentId);
console.log("Patient:", patient);
console.log("Socket:", socket);
    let interval = null;
    if (callStatus === "Connected") {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (callStatus !== "Connected" && callStatus !== "Reconnecting...") {
      setTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callStatus]);

  const createPeerConnection = (stream) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });

    peerConnection.onicecandidate = (event) => {
      if (event.candidate && appointmentId) {
        socketRef.current.emit("webrtc-ice-candidate", {
          appointmentId,
          candidate: event.candidate,
        });
      }
    };

   peerConnection.ontrack = (event) => {
  console.log("🎥 ONTRACK FIRED");
  console.log(event.streams);

  if (mainVideoRef.current) {
    mainVideoRef.current.srcObject = event.streams[0];

    mainVideoRef.current.onloadedmetadata = () => {
      mainVideoRef.current.play();
      setRemoteVideoLoaded(true);
    };
  }

  setCallStatus("Connected");
};

    peerConnection.onconnectionstatechange = () => {
      console.log(
        "Connection:",
        peerConnection.connectionState
      );

      if (peerConnection.connectionState === "connected") {
        setCallStatus("Connected");
      }

      if (peerConnection.connectionState === "connecting") {
        setCallStatus("Connecting...");
      }

      if (peerConnection.connectionState === "disconnected") {
        setCallStatus("Reconnecting...");
        setRemoteVideoLoaded(false);
      }

      if (
        peerConnection.connectionState === "failed" ||
        peerConnection.connectionState === "closed"
      ) {
        setCallStatus("Call Ended");
        setRemoteVideoLoaded(false);
      }
    };

    peerConnectionRef.current = peerConnection;

    return peerConnection;
  };

  useEffect(() => {
    if (!appointmentId) {
      alert("Appointment ID not found");
      navigate(isDoctor ? "/doctor-dashboard" : "/");
      return;
    }

    let active = true;

    const startCall = async () => {
  console.log("START CALL");

  try {
    console.log("Before getUserMedia");

    // const stream = await navigator.mediaDevices.getUserMedia({
    //   video: true,
    //   audio: true,
    // });
    const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
});

    console.log("After getUserMedia");

    if (!active) {
      stream.getTracks().forEach((track) => track.stop());
      return;
    }

    

        localStreamRef.current = stream;

        if (smallVideoRef.current) {
          smallVideoRef.current.srcObject = stream;
        }

        socketRef.current = socket;

        // FIXED: Execute room entry immediately if connection is already established
        if (socketRef.current.connected) {
          socketRef.current.emit("join-call-room", appointmentId);
          setCallStatus("Waiting for participant...");
        } else {
          socketRef.current.on("connect", () => {
            socketRef.current.emit("join-call-room", appointmentId);
            setCallStatus("Waiting for participant...");
          });
        }

        socketRef.current.on("call-room-full", () => {
          alert("This call already has two people.");
          navigate(isDoctor ? "/doctor-dashboard" : "/");
        });

        socketRef.current.on("call-user-joined", async () => {
          if (!isDoctor) return;

          try {
            const peerConnection = createPeerConnection(stream);

            const offer = await peerConnection.createOffer();

            await peerConnection.setLocalDescription(offer);

            socketRef.current.emit("webrtc-offer", {
              appointmentId,
              offer,
            });

            setCallStatus("Connecting...");
          } catch (error) {
            console.log("OFFER ERROR:", error);
          }
        });

        // FIXED: Unwraps payloads safely if encapsulated by object containers
        socketRef.current.on("webrtc-offer", async (data) => {
          if (isDoctor) return;

          try {
            const peerConnection = createPeerConnection(stream);
            const rawOffer = data.offer || data;

            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(rawOffer)
            );

            const answer = await peerConnection.createAnswer();

            await peerConnection.setLocalDescription(answer);

            socketRef.current.emit("webrtc-answer", {
              appointmentId,
              answer,
            });
          } catch (error) {
            console.log("ANSWER ERROR:", error);
          }
        });

        // FIXED: Unwraps payload properties cleanly
        socketRef.current.on("webrtc-answer", async (data) => {
          try {
            if (!peerConnectionRef.current) return;
            const rawAnswer = data.answer || data;

            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription(rawAnswer)
            );
          } catch (error) {
            console.log("SET ANSWER ERROR:", error);
          }
        });

        // FIXED: Unwraps incoming candidate structural parameters properly
        socketRef.current.on("webrtc-ice-candidate", async (data) => {
          try {
            if (!peerConnectionRef.current) return;
            const rawCandidate = data.candidate || data;

            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(rawCandidate)
            );
          } catch (error) {
            console.log("ICE CANDIDATE ERROR:", error);
          }
        });

        socketRef.current.on("call-user-left", () => {
          setCallStatus("Waiting for participant...");
          setRemoteVideoLoaded(false);

          if (mainVideoRef.current) {
            mainVideoRef.current.srcObject = null;
          }

          peerConnectionRef.current?.close();
          peerConnectionRef.current = null;
        });

        socketRef.current.on("call-ended", () => {
          alert("Call Ended");
          setCallStatus("Call Ended");
          setRemoteVideoLoaded(false);

          peerConnectionRef.current?.close();
          peerConnectionRef.current = null;

          localStreamRef.current?.getTracks().forEach((track) => {
            track.stop();
          });

          navigate(isDoctor ? "/doctor-dashboard" : "/");
        });
      } catch (err) {
  console.error("getUserMedia error:", err);
  console.error("name:", err.name);
  console.error("message:", err.message);

  alert(err.name + "\n" + err.message);
}
    };

    startCall();

    return () => {
      console.log("VIDEO CALL CLEANUP RUNNING");
      console.log("Leaving room:", appointmentId);
      active = false;

      // if (appointmentId) {
      //   socketRef.current?.emit("call-ended", {
      //     appointmentId,
      //     doctorId: patient?.doctorId,
      //     patientId: patient?.patientId,
      //   });

      //   socketRef.current?.emit("leave-call-room", appointmentId);
      // }

      socketRef.current?.off("call-user-left");
      socketRef.current?.off("call-ended");
      socketRef.current?.off("webrtc-offer");
      socketRef.current?.off("webrtc-answer");
      socketRef.current?.off("webrtc-ice-candidate");
     socketRef.current?.off("call-room-full");
socketRef.current?.off("call-user-joined");

      // NOTE: Intentionally removed .disconnect() here because you use a shared SocketProvider.
      // Disconnecting here drops the context socket instance entirely across the system.
      peerConnectionRef.current?.close();

      localStreamRef.current?.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [appointmentId, isDoctor, navigate]);

  const toggleMic = () => {
    localStreamRef.current?.getAudioTracks().forEach((track) => {
      track.enabled = !micOn;
    });

    setMicOn(!micOn);
  };

  const toggleCam = () => {
    localStreamRef.current?.getVideoTracks().forEach((track) => {
      track.enabled = !camOn;
    });

    setCamOn(!camOn);
  };

  const handleShare = async () => {
    try {
      if (sharing) {
        if (mainVideoRef.current && peerConnectionRef.current) {
          const receivers = peerConnectionRef.current.getReceivers();
          const remoteVideoTrack = receivers.find(r => r.track && r.track.kind === "video")?.track;
          if (remoteVideoTrack) {
            mainVideoRef.current.srcObject = new MediaStream([remoteVideoTrack]);
          }
        }
        setSharing(false);
        return;
      }

      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

      if (mainVideoRef.current) {
        mainVideoRef.current.srcObject = displayStream;
      }

      setSharing(true);

      displayStream.getVideoTracks()[0].onended = () => {
        if (mainVideoRef.current && peerConnectionRef.current) {
          const receivers = peerConnectionRef.current.getReceivers();
          const remoteVideoTrack = receivers.find(r => r.track && r.track.kind === "video")?.track;
          if (remoteVideoTrack) {
            mainVideoRef.current.srcObject = new MediaStream([remoteVideoTrack]);
          } else {
            mainVideoRef.current.srcObject = null;
          }
        }
        setSharing(false);
      };
    } catch (error) {
      console.log("SCREEN SHARE ERROR:", error);
    }
  };

  const endCall = () => {
    setCallStatus("Call Ended");
    setRemoteVideoLoaded(false);
    
    socketRef.current?.emit("call-ended", {
      appointmentId,
      doctorId: patient?.doctorId,
      patientId: patient?.patientId,
    });
    socketRef.current?.emit("leave-call-room", appointmentId);

    peerConnectionRef.current?.close();

    localStreamRef.current?.getTracks().forEach((track) => {
      track.stop();
    });

    if (isDoctor) {
      navigate("/doctor-decision", {
        state: patient,
      });
    } else {
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-950 relative text-white overflow-hidden font-sans">
      
      {/* Professional Top Glassmorphic Header */}
      <div className="absolute top-0 w-full px-6 py-4 z-20 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5 backdrop-blur-xs">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            {counterpartName}
          </h2>
          <p className="text-xs font-medium text-slate-400 mt-0.5">
            Role: {isDoctor ? "Consulting Doctor" : "Patient File View"}
          </p>
        </div>

        <div className="flex items-center gap-4 sm:self-center">
          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm flex items-center gap-1.5 backdrop-blur-md border ${
            callStatus === "Connected" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
            callStatus === "Reconnecting..." ? "bg-amber-500/10 text-amber-400 border-amber-500/20 animate-pulse" :
            callStatus === "Waiting for participant..." ? "bg-sky-500/10 text-sky-400 border-sky-500/20" :
            "bg-slate-500/10 text-slate-400 border-slate-500/20"
          }`}>
            {callStatus === "Connected" && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
            {callStatus}
          </div>

          {/* Call Duration Counter */}
          <div className="bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/50 text-sm font-mono font-medium text-slate-200 shadow-inner">
            {formatTime(timer)}
          </div>
        </div>
      </div>

      {/* Main Stream Frame Container */}
      <div className="relative w-full h-full flex items-center justify-center bg-slate-900">
        <video
          ref={mainVideoRef}
          autoPlay
          playsInline
          onLoadedData={() => setRemoteVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            remoteVideoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* CSS Loading Spinner State */}
        {!remoteVideoLoaded && callStatus !== "Call Ended" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 z-10 gap-3">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-400 tracking-wide">
              {callStatus === "Waiting for participant..." ? "Waiting for response..." : "Connecting to video..."}
            </p>
          </div>
        )}
      </div>

      {/* Mini-Self Preview Picture-in-Picture Card */}
      <div className="absolute top-24 right-4 w-32 h-44 sm:w-40 sm:h-52 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-950 shadow-2xl transition-all duration-300 hover:scale-105 z-10">
        <video
          ref={smallVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover scale-x-[-1]"
        />
        <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] text-slate-300 font-medium">
          You
        </div>
      </div>

      {/* Premium Studio Bottom Controls Panel */}
      <div className="absolute bottom-8 w-full px-4 flex justify-center z-20">
        <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl px-6 py-3.5 rounded-full border border-white/10 shadow-2xl">
          
          {/* Audio Button */}
          <button
            onClick={toggleMic}
            className={`p-4 rounded-full transition-all duration-200 cursor-pointer shadow-md ${
              micOn 
                ? "bg-slate-800 hover:bg-slate-700 text-white" 
                : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
            }`}
            title={micOn ? "Mute Microphone" : "Unmute Microphone"}
          >
            {micOn ? <FaMicrophone className="text-lg" /> : <FaMicrophoneSlash className="text-lg" />}
          </button>

          {/* Camera Button */}
          <button
            onClick={toggleCam}
            className={`p-4 rounded-full transition-all duration-200 cursor-pointer shadow-md ${
              camOn 
                ? "bg-slate-800 hover:bg-slate-700 text-white" 
                : "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
            }`}
            title={camOn ? "Stop Video" : "Start Video"}
          >
            {camOn ? <FaVideo className="text-lg" /> : <FaVideoSlash className="text-lg" />}
          </button>

          {/* Screen Share Button */}
          <button
            onClick={handleShare}
            className={`p-4 rounded-full transition-all duration-200 cursor-pointer shadow-md ${
              sharing
                ? "bg-emerald-500 hover:bg-emerald-600 text-white animate-pulse"
                : "bg-slate-800 hover:bg-slate-700 text-white"
            }`}
            title={sharing ? "Stop Sharing Screen" : "Share Screen"}
          >
            <FaDesktop className="text-lg" />
          </button>

          <div className="w-px h-6 bg-slate-800 mx-1"></div>

          {/* End Call Button */}
          <button
            onClick={endCall}
            className="p-4 rounded-full bg-red-600 hover:bg-red-500 text-white transition-all duration-200 cursor-pointer shadow-lg hover:shadow-red-600/20 hover:scale-105 active:scale-95"
            title="Disconnect Call"
          >
            <FaPhone className="text-lg transform rotate-[230deg]" />
          </button>

        </div>
      </div>

    </div>
  );
}