const Joi = require("joi");
const { objectId } = require("./custom.validation");

const create = {
  body: Joi.object().keys({
    courseId: Joi.required()
      .custom(objectId)
  }),
};

module.exports = {
  create
};
