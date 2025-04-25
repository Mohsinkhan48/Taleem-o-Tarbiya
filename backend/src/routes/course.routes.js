const { Router } = require("express");
const { courseValidation } = require("../validations");
const { courseController } = require("../controllers");

const {
  validate,
  isMember,
  isAuth,
} = require("../middlewares");
const hasRole = require("../middlewares/hasRole.middleware");
const { ROLES } = require("../constants");

const router = Router();

router.post(
  "/create",
  validate(courseValidation.createCourse),
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  courseController.createCourse
);

router.get(
  "/",
  courseController.getAllCourses
);

router.get(
  "/:courseId",
  validate(courseValidation.getCourseById),
  courseController.getCourseById
);

router.get(
  "/instructor/courses",
  isAuth,
  isMember,
  courseController.getCoursesByInstructor
);

router.get(
  "/student/courses",
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  courseController.getCoursesByStudent
);

router.get(
  "/student/courses/:courseId",
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  courseController.getStudentEnrolledCourse
)

module.exports = router;
