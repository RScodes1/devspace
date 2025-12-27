const { activityModel } = require("../models/activity.model");
const logger = require("../utils/logger");

const socketHandlers = (io, socket) => {
  logger.info(`🔹 User connected: ${socket.id}`);

  // User joins a workspace
  socket.on("joinWorkspace", ({ workspaceId, userId }) => {
    try {
      socket.join(workspaceId);
      logger.info(`User ${userId} joined workspace ${workspaceId}`);
      io.to(workspaceId).emit("userJoined", { userId });
    } catch (err) {
      logger.error(`Error in joinWorkspace: ${err.message}`, { stack: err.stack });
    }
  });

  // User leaves
  socket.on("leaveWorkspace", ({ workspaceId, userId }) => {
    try {
      socket.leave(workspaceId);
      logger.info(`User ${userId} left workspace ${workspaceId}`);
      io.to(workspaceId).emit("userLeft", { userId });
    } catch (err) {
      logger.error(`Error in leaveWorkspace: ${err.message}`, { stack: err.stack });
    }
  });

  // Activity event
  socket.on("activity", async ({ workspaceId, userId, type, payload }) => {
    try {
      // Save activity in Mongo
      const activity = new activityModel({ workspaceId, userId, type, payload });
      await activity.save();

      io.to(workspaceId).emit("activity", { userId, type, payload });
      logger.info(`Activity saved for user ${userId} in workspace ${workspaceId}`, { type, payload });
    } catch (err) {
      logger.error(`Error in activity event: ${err.message}`, { stack: err.stack, workspaceId, userId, type });
    }
  });

  socket.on("disconnect", () => {
    logger.info(`🔹 User disconnected: ${socket.id}`);
  });
};

module.exports = socketHandlers;
