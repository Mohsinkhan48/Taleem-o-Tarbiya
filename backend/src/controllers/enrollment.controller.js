const { R2XX, R4XX } = require("../Responses");
const { enrollmentService } = require("../services");
const { catchAsync } = require("../utils");

const enrollmentController = {
  enrollStudent: catchAsync(async (req, res) => {
    const { courseId } = req.body;
    const studentId = req.user;

    if (!courseId) {
      return R4XX(res, 400, "Course ID is required");
    }

    const enrollment = await enrollmentService.enrollStudent(courseId, studentId);

    if (!enrollment) {
      return R4XX(res, 400, "Enrollment failed or already exists");
    }

    R2XX(res, "Enrollment successful", 201, { enrollment });
  })
};

module.exports = enrollmentController;
