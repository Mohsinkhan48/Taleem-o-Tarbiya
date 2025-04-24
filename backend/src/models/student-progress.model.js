const mongoose = require("mongoose");

const StudentProgressSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    completedChapters: [String],
    quizScores: [
      {
        moduleId: mongoose.Schema.Types.ObjectId,
        chapterTitle: String,
        score: Number,
      },
    ],
    assignmentSubmissions: [
      {
        moduleId: mongoose.Schema.Types.ObjectId,
        chapterTitle: String,
        submittedAt: Date,
        fileUrl: String,
        grade: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StudentProgress", StudentProgressSchema);
