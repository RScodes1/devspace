const mongoose = require("mongoose");
const { env } = require("./env");

/**
 * MongoDB connection
 * Used for:
 * - Activity logs
 * - Collaboration events
 */
const connectMongo = async () => {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(env.MONGO_URI, {
      autoIndex: env.NODE_ENV !== "production"
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error);
    process.exit(1);
  }
};

/**
 * Graceful shutdown
 */
const disconnectMongo = async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB disconnected");
};

module.exports = {
  connectMongo,
  disconnectMongo
};
