const Joi = require("joi");
const { objectId } = require("./custom.validation");
const { CART } = require("../constants");

const addToCart = {
  body: Joi.object().keys({
    courseId: Joi.string()
      .required()
      .custom(objectId)
      .messages({
        "any.required": CART.COURSE_ID_REQUIRED,
        "any.invalid": CART.INVALID_COURSEID,
      }),
  }),
};

const removeFromCart = {
  body: Joi.object().keys({
    courseId: Joi.string()
      .required()
      .custom(objectId)
      .messages({
        "any.required": CART.COURSE_ID_REQUIRED,
        "any.invalid": CART.INVALID_COURSEID,
      }),
  }),
};

module.exports = {
  addToCart,
  removeFromCart,
};
