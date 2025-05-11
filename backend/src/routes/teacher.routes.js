const express = require("express");
const teacherController = require("../controllers/teacher.controller");
const { isMember, isAuth } = require("../middlewares");
const hasRole = require("../middlewares/hasRole.middleware");
const { ROLES } = require("../constants");
const router = express.Router();

router.get(
  "/onboard",
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  teacherController.onboardTeacher
);
router.get(
  "/stripe/status",
  isAuth,
  isMember,
  hasRole([ROLES.TEACHER]),
  teacherController.getStripeAccountStatus
);

module.exports = router;
