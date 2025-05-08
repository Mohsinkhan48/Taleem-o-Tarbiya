const mongoose = require("mongoose");

const LectureSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    chapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chapters",
      required: true,
    },
    videoUrl: { type: String, required: true },
    duration: { type: Number }, // in seconds
    resolution: { type: String }, // e.g., "1920x1080"
    size: { type: Number }, // in bytes
    format: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lectures", LectureSchema);
