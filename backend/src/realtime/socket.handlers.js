const Activity = require("../models/activity.model");

const socketHandlers = (io, socket) => {
  console.log(`🔹 User connected: ${socket.id}`);

  // User joins a workspace
  socket.on("joinWorkspace", ({ workspaceId, userId }) => {
    socket.join(workspaceId);
    console.log(`User ${userId} joined workspace ${workspaceId}`);
    io.to(workspaceId).emit("userJoined", { userId });
  });

  // User leaves
  socket.on("leaveWorkspace", ({ workspaceId, userId }) => {
    socket.leave(workspaceId);
    console.log(`User ${userId} left workspace ${workspaceId}`);
    io.to(workspaceId).emit("userLeft", { userId });
  });

  // File change / cursor updates
  socket.on("activity", async ({ workspaceId, userId, type, payload }) => {
    // Save activity in Mongo
    const activity = new Activity({ workspaceId, userId, type, payload });
    await activity.save();

    // Broadcast to workspace
    io.to(workspaceId).emit("activity", { userId, type, payload });
  });

  socket.on("disconnect", () => {
    console.log(`🔹 User disconnected: ${socket.id}`);
  });
};

module.exports = socketHandlers;
