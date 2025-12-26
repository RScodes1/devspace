// src/server.js
const http = require("http");
const app = require("./app");
const { initSocketServer } = require("./realtime/socket.server");
const { connectMongo } = require("./config/mongo");
const { env } = require("./config/env");

(async () => {
  await connectMongo();

  const server = http.createServer(app);
  initSocketServer(server);

  const PORT = env.PORT || 4500;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})();
