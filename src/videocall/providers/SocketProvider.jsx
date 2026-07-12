import React, {
  createContext,
  useContext,
  useEffect,
} from "react";

import { socket } from "../services/socket";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  useEffect(() => {
    console.log("🟢 SocketProvider Mounted");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("✅ Socket Connected");

      if (user?.id && user?.role) {
        socket.emit("register-user", {
          userId: user.id,
          role: user.role,
        });

        console.log("✅ User Registered:", user.name);
      }
    };

    socket.on("connect", handleConnect);

    return () => {
      console.log("🔴 SocketProvider Unmounted");

      socket.off("connect", handleConnect);

      if (socket.connected) {
        // socket.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}
