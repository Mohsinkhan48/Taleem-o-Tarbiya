const mongoose = require("mongoose");

const CourseLevelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course_levels", CourseLevelSchema);
