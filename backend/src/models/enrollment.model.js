const mongoose = require("mongoose");
const { Schema } = mongoose;

const enrollmentSchema = new Schema(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("enrollments", enrollmentSchema);
