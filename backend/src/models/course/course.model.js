const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    image: { type: String, required: false, default: null },
    previewUrl: { type: String, required: false, default: null },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course_levels",
      required: true,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "modules",
      },
    ],
    ratings: { type: [Number], default: [] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course_categories",
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course_tags",
        required: true,
      },
    ],
    isPaid: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", CourseSchema);
