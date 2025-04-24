const { Router } = require("express");
const { paymentController } = require("../controllers");

const {
  isMember,
  isAuth,
  hasRole,
} = require("../middlewares");
const { ROLES } = require("../constants");

const router = Router();

router.post(
  "/create-checkout-session",
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  paymentController.createCheckoutSession
);

module.exports = router;
