const mongoose = require("mongoose");

const QuizProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "quizes", required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "chapters", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },

    attemptedAt: { type: Date, default: Date.now },
    score: { type: Number, required: true },
    total: { type: Number, required: true },

    answers: [
      {
        question: String,
        selectedOption: String,
        isCorrect: Boolean,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("quizes_progress", QuizProgressSchema);
