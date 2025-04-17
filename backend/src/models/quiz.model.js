const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title: { type: String },
  questions: [
    {
      question: { type: String },
      options: [{ type: String }],
      correctAnswer: { type: String },
    },
  ],
});

module.exports = mongoose.model("quizes", QuizSchema);
