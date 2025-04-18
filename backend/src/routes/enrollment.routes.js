const { Router } = require("express");
const { enrollmentController } = require("../controllers");

const {
  validate,
  isMember,
  isAuth,
  hasRole,
} = require("../middlewares");
const { ROLES } = require("../constants");
const { enrollmentValidation } = require("../validations");

const router = Router();

router.post(
  "/create",
  validate(enrollmentValidation.create),
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  enrollmentController.enrollStudent
);

module.exports = router;
