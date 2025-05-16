const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("assignments", AssignmentSchema);
