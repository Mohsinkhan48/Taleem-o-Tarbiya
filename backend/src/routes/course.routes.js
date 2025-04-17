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
  "/instructor/courses",
  isAuth,
  courseController.getCoursesByInstructor
);

module.exports = router;
