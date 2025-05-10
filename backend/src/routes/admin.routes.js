const { Router } = require("express");
const { adminController } = require("../controllers");

const { isMember, isAuth, hasRole } = require("../middlewares");
const { ROLES } = require("../constants");

const router = Router();

router.get(
  "/dashboard",
  isAuth,
  isMember,
  hasRole([ROLES.ADMIN]),
  adminController.adminDashboard
);
router.get(
  "/instructors",
  isAuth,
  isMember,
  hasRole([ROLES.ADMIN]),
  adminController.getInstructors
);
router.get(
  "/students",
  isAuth,
  isMember,
  hasRole([ROLES.ADMIN]),
  adminController.getStudents
);
router.get(
  "/payments",
  isAuth,
  isMember,
  hasRole([ROLES.ADMIN]),
  adminController.getPayments
);

module.exports = router;
