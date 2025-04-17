const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
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
    category: { type: String, required: true, trim: true },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", CourseSchema);
