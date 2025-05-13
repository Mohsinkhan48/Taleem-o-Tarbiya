const { Router } = require("express");
const { courseValidation } = require("../validations");
const { courseController } = require("../controllers");

const { validate, isMember, isAuth } = require("../middlewares");
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

router.put(
  "/update",
  validate(courseValidation.updateCourse),
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  courseController.updateCourse
);

router.put(
  "/addChapterToModule",
  validate(courseValidation.addChapterToModule),
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  courseController.addChapterToModule
);

router.post(
  "/upload-thumbnail/:courseId",
  validate(courseValidation.getCourseById),
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  courseController.uploadThumbnail
);

router.get(
  "/get-certificate/:courseId",
  validate(courseValidation.getCourseById),
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  courseController.getCertificate
);

router.post(
  "/upload-lecture/:courseId/:moduleId/:chapterId",
  validate(courseValidation.uploadLectureVideo),
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  courseController.uploadLectureVideo
);

router.get("/", courseController.getAllCourses);

router.get(
  "/:courseId",
  validate(courseValidation.getCourseById),
  courseController.getCourseById
);

router.get(
  "/instructor/courses/:courseId",
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  validate(courseValidation.getCourseById),
  courseController.getInstructorCourseById
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
);

router.get(
  "/teacher/dashboard",
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  courseController.getTeacherDashboard
);

module.exports = router;
