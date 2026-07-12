import React, { createContext, useEffect, useState } from "react";
import { useSocket } from "./SocketProvider";

export const IncomingCallContext = createContext(null);

export function IncomingCallProvider({ children }) {
  const socket = useSocket();

  const [incomingCall, setIncomingCall] = useState(null);
  const [isRinging, setIsRinging] = useState(false);

  const showIncomingCall = (callData) => {
    setIncomingCall(callData);
    setIsRinging(true);
  };

  const clearIncomingCall = () => {
    setIncomingCall(null);
    setIsRinging(false);
  };

  useEffect(() => {
    if (!socket) return;

    const handleIncomingCall = (callData) => {
      console.log("📞 Incoming Call:", callData);
      showIncomingCall(callData);
    };

    const handleCallCancelled = () => {
      console.log("📴 Call Cancelled");
      clearIncomingCall();
    };

    const handleCallEnded = () => {
      console.log("☎️ Call Ended");
      clearIncomingCall();
    };

    socket.on("incoming-call", handleIncomingCall);
    socket.on("call-cancelled", handleCallCancelled);
    socket.on("call-ended", handleCallEnded);

    return () => {
      socket.off("incoming-call", handleIncomingCall);
      socket.off("call-cancelled", handleCallCancelled);
      socket.off("call-ended", handleCallEnded);
    };
  }, [socket]);

  return (
    <IncomingCallContext.Provider
      value={{
        incomingCall,
        isRinging,
        showIncomingCall,
        clearIncomingCall,
      }}
    >
      {children}
    </IncomingCallContext.Provider>
  );
}