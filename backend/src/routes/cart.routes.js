const { Router } = require("express");
const { cartController } = require("../controllers");

const { validate, isMember, isAuth, hasRole } = require("../middlewares");
const { ROLES } = require("../constants");
const { cartValidation } = require("../validations");

const router = Router();

router.post(
  "/add",
  validate(cartValidation.addToCart),
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  cartController.addToCart
);

router.delete(
  "/remove",
  validate(cartValidation.removeFromCart),
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  cartController.removeFromCart
);

router.get(
  "/get",
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  cartController.getCart
);

router.delete(
  "/clear",
  isAuth,
  isMember,
  hasRole([ROLES.STUDENT]),
  cartController.clearCart
);

module.exports = router;
