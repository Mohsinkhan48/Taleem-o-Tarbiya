const mongoose = require("mongoose");

const ChapterSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: { type: String },
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
});

module.exports = mongoose.model("chapters", ChapterSchema);
