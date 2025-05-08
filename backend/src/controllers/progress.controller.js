const { R2XX, R4XX } = require("../Responses");
const { progressService } = require("../services");
const { catchAsync } = require("../utils");

const progressController = {
  // Update lecture progress
  updateLectureProgress: catchAsync(async (req, res) => {
    const userId = req.user;
    const { lectureId } = req.params;
    const { currentTime, completed } = req.body;

    const progress = await progressService.updateLectureProgress(
      userId,
      lectureId,
      currentTime,
      completed
    );
    if (!progress) return R4XX(res, 400, "Lecture progress update failed");

    R2XX(res, "Lecture progress updated", 200, { progress });
  }),

  // Submit quiz progress
  submitQuizProgress: catchAsync(async (req, res) => {
    const userId = req.user;
    const { courseId, moduleId, chapterId, quizId } = req.params;
    const { answers } = req.body;

    const result = await progressService.submitQuizProgress(
      userId,
      chapterId,
      moduleId,
      courseId,
      quizId,
      answers
    );
    if (!result) return R4XX(res, 400, "Quiz submission failed");

    R2XX(res, "Quiz submitted", 200, { result });
  }),

  getQuizProgress: catchAsync(async (req, res) => {
    const userId = req.user;
    const { courseId, moduleId, chapterId, quizId } = req.params;
    const { answers } = req.body;

    const result = await progressService.getQuizProgress(
      userId,
      chapterId,
      moduleId,
      courseId,
      quizId,
      answers
    );
    if (!result) return R4XX(res, 400, "Quiz progress not found");

    R2XX(res, "Quiz fetched sucessfully", 200, { result });
  }),

  // Mark assignment as submitted
  markAssignmentSubmitted: catchAsync(async (req, res) => {
    const userId = req.user;
    const { assignmentId } = req.params;

    const result = await progressService.markAssignmentSubmitted(
      userId,
      assignmentId
    );
    if (!result) return R4XX(res, 400, "Assignment submission failed");

    R2XX(res, "Assignment marked as submitted", 200, { result });
  }),

  // Get user progress for a course
  getCourseProgress: catchAsync(async (req, res) => {
    const userId = req.user;
    const { courseId } = req.params;

    const progress = await progressService.getCourseProgress(userId, courseId);
    if (!progress) return R4XX(res, 404, "Course progress not found");

    R2XX(res, "Course progress retrieved", 200, { progress });
  }),
};

module.exports = progressController;
