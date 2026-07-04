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
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export default function VideoCallPage() {
  const navigate = useNavigate();
  const location = useLocation();

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

  const appointmentId =
    patient?.appointmentId ||
    patient?._id ||
    null;

  const isDoctor =
    JSON.parse(localStorage.getItem("user"))?.role === "doctor";

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
      if (mainVideoRef.current) {
        mainVideoRef.current.srcObject = event.streams[0];
      }

      setCallStatus("In Call");
    };

    peerConnection.onconnectionstatechange = () => {
      if (peerConnection.connectionState === "connected") {
        setCallStatus("In Call");
      }

      if (
        peerConnection.connectionState === "disconnected" ||
        peerConnection.connectionState === "failed"
      ) {
        setCallStatus("Connection lost");
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
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (!active) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        localStreamRef.current = stream;

        if (smallVideoRef.current) {
          smallVideoRef.current.srcObject = stream;
        }

        const socket = io(SOCKET_URL, {
          transports: ["websocket"],
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          socket.emit("join-call-room", appointmentId);
          setCallStatus("Waiting for the other person...");
        });

        socket.on("call-room-full", () => {
          alert("This call already has two people.");
          navigate(isDoctor ? "/doctor-dashboard" : "/");
        });

        socket.on("call-user-joined", async () => {
          if (!isDoctor) return;

          try {
            const peerConnection = createPeerConnection(stream);

            const offer = await peerConnection.createOffer();

            await peerConnection.setLocalDescription(offer);

            socket.emit("webrtc-offer", {
              appointmentId,
              offer,
            });

            setCallStatus("Calling patient...");
          } catch (error) {
            console.log("OFFER ERROR:", error);
          }
        });

        socket.on("webrtc-offer", async (offer) => {
          if (isDoctor) return;

          try {
            const peerConnection = createPeerConnection(stream);

            await peerConnection.setRemoteDescription(
              new RTCSessionDescription(offer)
            );

            const answer = await peerConnection.createAnswer();

            await peerConnection.setLocalDescription(answer);

            socket.emit("webrtc-answer", {
              appointmentId,
              answer,
            });
          } catch (error) {
            console.log("ANSWER ERROR:", error);
          }
        });

        socket.on("webrtc-answer", async (answer) => {
          try {
            if (!peerConnectionRef.current) return;

            await peerConnectionRef.current.setRemoteDescription(
              new RTCSessionDescription(answer)
            );
          } catch (error) {
            console.log("SET ANSWER ERROR:", error);
          }
        });

        socket.on("webrtc-ice-candidate", async (candidate) => {
          try {
            if (!peerConnectionRef.current) return;

            await peerConnectionRef.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
          } catch (error) {
            console.log("ICE CANDIDATE ERROR:", error);
          }
        });

        socket.on("call-user-left", () => {
          setCallStatus("Other person left the call");

          if (mainVideoRef.current) {
            mainVideoRef.current.srcObject = null;
          }

          peerConnectionRef.current?.close();
          peerConnectionRef.current = null;
        });
      } catch (error) {
        console.log("CAMERA ERROR:", error);
        alert("Camera and microphone permission is required for the call.");
        navigate(isDoctor ? "/doctor-dashboard" : "/");
      }
    };

    startCall();

    return () => {
      active = false;

      if (appointmentId) {
        socketRef.current?.emit("leave-call-room", appointmentId);
      }

      socketRef.current?.disconnect();

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
        setSharing(false);
      };
    } catch (error) {
      console.log("SCREEN SHARE ERROR:", error);
    }
  };

  const endCall = () => {
    socketRef.current?.emit("leave-call-room", appointmentId);

    socketRef.current?.disconnect();

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
    <div className="h-screen w-full bg-black relative text-white overflow-hidden">
      <div className="absolute top-0 w-full px-4 py-3 z-10 bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-lg font-semibold">
          {patient?.name || "Video Consultation"}
        </h2>

        <p className="text-xs text-gray-300">
          {callStatus}
        </p>
      </div>

      <video
        ref={mainVideoRef}
        autoPlay
        playsInline
        className="w-full h-full object-cover bg-gray-950"
      />

      <div className="absolute top-20 right-4 w-28 h-36 rounded-xl overflow-hidden border border-white/30 bg-gray-800 shadow-xl">
        <video
          ref={smallVideoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover scale-x-[-1]"
        />
      </div>

      <div className="absolute bottom-6 w-full px-4 flex justify-center gap-3 sm:gap-5">
        <button
          onClick={toggleMic}
          className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
        </button>

        <button
          onClick={toggleCam}
          className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition"
        >
          {camOn ? <FaVideo /> : <FaVideoSlash />}
        </button>

        <button
          onClick={handleShare}
          className={`p-4 rounded-full transition ${
            sharing
              ? "bg-teal-500"
              : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          <FaDesktop />
        </button>

        <button
          onClick={endCall}
          className="p-4 rounded-full bg-red-600 hover:bg-red-700 transition"
        >
          <FaPhone className="transform rotate-[230deg]" />
        </button>
      </div>
    </div>
  );
}