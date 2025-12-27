const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    workspaceId: { type: String, required: true },
    userId: { type: String },
    type: { type: String, required: true },
    payload: { type: Object },
    createdAt: { type: Date, default: Date.now }
  },
  {
    collection: "activities"
  }
);

 const activityModel = mongoose.model("Activity", activitySchema);
module.exports = {
  activityModel
}