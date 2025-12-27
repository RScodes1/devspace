import { useSocketContext } from "../context/SocketContext";

export const useSocket = () => {
  const context = useSocketContext();
  if (!context) {
    throw new Error("usesocket must be used inside SocketProvider");
  }
  return context;
};
