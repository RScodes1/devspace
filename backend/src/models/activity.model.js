const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    workspaceId: { type: String, required: true },
    userId: { type: String },
    type: { type: String, required: true }, // e.g., "file_change", "cursor_update"
    payload: { type: Object },
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: "activities"
  }
);

module.exports = mongoose.model("Activity", activitySchema);
