const mongoose = require('mongoose');
const { Schema } = mongoose;

const enrollmentSchema = new Schema({
  studentId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'courses',
    required: true
  },
  enrolledAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('enrollments', enrollmentSchema);
