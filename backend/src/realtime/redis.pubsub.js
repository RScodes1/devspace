const { redis } = require("../config/redis");
const { Server } = require("socket.io");
const { createAdapter } = require("@socket.io/redis-adapter");
const logger = require("../utils/logger");

const setupRedisAdapter = (io) => {
  const pubClient = redis.duplicate();
  const subClient = redis.duplicate();

  io.adapter(createAdapter(pubClient, subClient));

  logger.info("Socket.IO Redis adapter configured");
};

module.exports = { setupRedisAdapter };
