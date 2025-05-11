const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createCheckoutSession = {
  body: Joi.object().keys({
    courseId: Joi.required().custom(objectId),
  }),
};

module.exports = {
  createCheckoutSession,
};
