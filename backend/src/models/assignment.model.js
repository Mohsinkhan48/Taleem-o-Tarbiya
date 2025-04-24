const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema(
  {
    title: { type: String },
    description: { type: String },
    dueDate: { type: Date },
    submissionType: {
      type: String,
      enum: ["file", "text", "link"],
      default: "file",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("assignments", AssignmentSchema);
