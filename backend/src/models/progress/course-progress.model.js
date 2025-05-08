const mongoose = require("mongoose");

const CourseProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },

    currentLecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lectures",
      required: false,
    },
    currentChapter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chapters",
      required: false,
    },

    completedChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "chapters" }],
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses_progress", CourseProgressSchema);
