const Joi = require("joi");
const { objectId } = require("./custom.validation");

const updateLectureProgress = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId).required(),
    moduleId: Joi.string().custom(objectId).required(),
    chapterId: Joi.string().custom(objectId).required(),
    lectureId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    currentTime: Joi.number().required(),
    completed: Joi.boolean().required(),
  }),
};

const submitQuizProgress = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId).required(),
    moduleId: Joi.string().custom(objectId).required(),
    chapterId: Joi.string().custom(objectId).required(),
    quizId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    answers: Joi.array().items(Joi.string()).required(),
  }),
};

const markAssignmentSubmitted = {
  params: Joi.object().keys({
    assignmentId: Joi.string().custom(objectId).required(),
  }),
};

const getCourseProgress = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  updateLectureProgress,
  submitQuizProgress,
  markAssignmentSubmitted,
  getCourseProgress,
};
