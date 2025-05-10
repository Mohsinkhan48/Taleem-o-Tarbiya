const mongoose = require("mongoose");

const ChapterProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "chapters", required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "modules", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },

    lectureCompleted: { type: Boolean, default: false },
    quizCompleted: { type: Boolean, default: false },
    assignmentSubmitted: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("chapters_progress", ChapterProgressSchema);
