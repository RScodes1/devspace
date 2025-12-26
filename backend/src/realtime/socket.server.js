// src/realtime/socket.server.js
const { Server } = require("socket.io");
const socketHandlers = require("./socket.handlers");
const { setupRedisAdapter } = require("./redis.pubsub");

const initSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGINS?.split(",") || "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    // path: "/realtime"  // optional: remove or make client match
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
