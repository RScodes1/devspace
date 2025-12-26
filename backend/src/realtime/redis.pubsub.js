const { redis } = require("../config/redis");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");

/**
 * Create Redis adapter for Socket.IO
 */
const setupRedisAdapter = (io) => {
  const pubClient = redis.duplicate();
  const subClient = redis.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  console.log("✅ Socket.IO Redis adapter configured");
};

module.exports = { setupRedisAdapter };
