const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    lecture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lectures",
    },
    isPreview: { type: Boolean, default: false },
    module: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "modules",
      required: true,
    },
    resources: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "quizes",
    },
    assignment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assignments",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chapters", ChapterSchema);
