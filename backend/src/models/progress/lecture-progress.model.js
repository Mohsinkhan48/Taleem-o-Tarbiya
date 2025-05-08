const mongoose = require("mongoose");

const LectureProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    lecture: { type: mongoose.Schema.Types.ObjectId, ref: "lectures", required: true },
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: "chapters", required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "courses", required: true },
    module: { type: mongoose.Schema.Types.ObjectId, ref: "modules", required: true },

    currentTime: { type: Number, default: 0 }, // in seconds
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("lectures_progress", LectureProgressSchema);
