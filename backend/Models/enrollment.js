const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users", // Reference to the UserModel
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "courses", // Reference to the CourseModel
    required: true,
  },
  status: {
    type: String,
    enum: ["enrolled", "completed", "in-progress"], // Track the course status
    default: "enrolled", // Default status is 'enrolled'
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"], // Track if the course is paid or unpaid
    default: "unpaid", // Default is unpaid
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  completionDate: {
    type: Date, // Store the date when the course is completed
  },
}, { timestamps: true }); // Adds createdAt & updatedAt fields automatically

const EnrollmentModel = mongoose.model("enrollments", EnrollmentSchema);
module.exports = EnrollmentModel;
