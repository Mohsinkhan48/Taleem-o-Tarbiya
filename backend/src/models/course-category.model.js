const mongoose = require("mongoose");

const CourseCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("course_categories", CourseCategorySchema);
