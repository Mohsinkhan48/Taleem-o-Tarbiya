const { Enrollment } = require("../models");

const enrollmentService = {
  enrollStudent: async (courseId, studentId) => {
    const existing = await Enrollment.findOne({ courseId, studentId });
    if (existing) return null;

    const newEnrollment = await Enrollment.create({
      course: courseId,
      student: studentId,
    });
    return newEnrollment;
  }
};

module.exports = enrollmentService;
