const { Server } = require("socket.io");
const http = require("http");
const socketHandlers = require("./socket.handlers");
const { setupRedisAdapter } = require("./redis.pubsub");

/**
 * Initialize Socket.IO
 */
const initSocketServer = (expressApp, server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGINS?.split(",") || "*",
      methods: ["GET", "POST"],
      credentials: true
    },
    path: "/realtime"
  });

  // Redis adapter
  setupRedisAdapter(io);

  io.on("connection", (socket) => {
    socketHandlers(io, socket);
  });

  console.log("✅ Socket.IO server initialized");

  return io;
};

module.exports = { initSocketServer };
