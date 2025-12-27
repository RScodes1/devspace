import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io(import.meta.env.VITE_API_URL, {
      auth: { token },
      path: "/realtime",
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("🟢 Socket connected", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
    });

    return () => {
      socketRef.current.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
