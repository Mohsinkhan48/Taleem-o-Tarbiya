const mongoose = require("mongoose");

const CourseTagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course_tags", CourseTagSchema);
