// src/server.js
const http = require("http");
const app = require("./app");
const { initSocket } = require("./realtime/socket.server");
const { worker } = require("./jobs/job.processor"); // optional, if you want to start job worker here
const { env } = require("./config/env");

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO with server
initSocket(server);

// Optionally start async job workers
// worker(); // Already running in job.processor.js, can remove this line if not needed

const PORT = env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
