const { Router } = require("express");
const { progressController } = require("../controllers");
const {
  validate,
  isAuth,
  hasRole,
} = require("../middlewares");
const { ROLES } = require("../constants");
const { progressValidation } = require("../validations");

const router = Router();

router.post(
  "/lecture/:courseId/:moduleId/:chapterId/:lectureId?",
  isAuth,
  hasRole([ROLES.STUDENT]),
  progressController.updateLectureProgress
);

router.post(
  "/quiz/:courseId/:moduleId/:chapterId/:quizId",
  validate(progressValidation.submitQuizProgress),
  isAuth,
  hasRole([ROLES.STUDENT]),
  progressController.submitQuizProgress
);

router.get(
  "/quiz-progress/:courseId/:moduleId/:chapterId/:quizId",
  isAuth,
  hasRole([ROLES.STUDENT]),
  progressController.getQuizProgress
);

router.post(
  "/assignment/:assignmentId",
  validate(progressValidation.markAssignmentSubmitted),
  isAuth,
  hasRole([ROLES.STUDENT]),
  progressController.markAssignmentSubmitted
);

router.get(
  "/course/:courseId",
  validate(progressValidation.getCourseProgress),
  isAuth,
  hasRole([ROLES.STUDENT]),
  progressController.getCourseProgress
);

module.exports = router;
