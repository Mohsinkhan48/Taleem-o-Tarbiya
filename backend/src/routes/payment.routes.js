const { Router } = require("express");
const { paymentController } = require("../controllers");

const {
  isMember,
  isAuth,
  hasRole,
  validate,
} = require("../middlewares");
const { ROLES } = require("../constants");
const { paymentValidation } = require("../validations");

const router = Router();

router.post(
  "/create-checkout-session",
  validate(paymentValidation.createCheckoutSession),
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  paymentController.createCheckoutSession
);

module.exports = router;
