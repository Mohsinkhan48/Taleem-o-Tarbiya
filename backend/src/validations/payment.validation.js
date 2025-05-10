const Joi = require("joi");
const { objectId } = require("./custom.validation");

const createCheckoutSession = {
  body: Joi.object().keys({
    courseIds: Joi.array().items(Joi.required()
      .custom(objectId))
  }),
};

module.exports = {
  createCheckoutSession
};
