const Joi = require("joi");
const { objectId } = require("./custom.validation");
const { CART } = require("../constants");

const courseValidation = {
  createCourse: {
    body: Joi.object({
      image: Joi.string().required(),
      title: Joi.string().trim().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      duration: Joi.string().required(),
      price: Joi.number().min(0).required(),
      level: Joi.string()
        .valid("Beginner", "Intermediate", "Advanced")
        .required(),
      category: Joi.string().trim().required(),
      isPaid: Joi.boolean().default(true),
      modules: Joi.array()
        .items(
          Joi.object({
            title: Joi.string().required(),
            chapters: Joi.array()
              .items(
                Joi.object({
                  title: Joi.string().required(),
                  content: Joi.string().required(),
                  videoUrl: Joi.string().uri().optional(),
                  isPreview: Joi.boolean().default(false),
                  resources: Joi.array()
                    .items(
                      Joi.object({
                        name: Joi.string().required(),
                        url: Joi.string().uri().required(),
                      })
                    )
                    .optional(),
                  quiz: Joi.object({
                    title: Joi.string().required(),
                    questions: Joi.array()
                      .items(
                        Joi.object({
                          question: Joi.string().required(),
                          options: Joi.array()
                            .items(Joi.string().required())
                            .min(2)
                            .required(),
                          correctAnswer: Joi.string().required(),
                        })
                      )
                      .min(1)
                      .required(),
                  }).optional(),
                  assignment: Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string().required(),
                    dueDate: Joi.date().iso().required(),
                    submissionType: Joi.string()
                      .valid("file", "text", "link")
                      .required(),
                  }).optional(),
                })
              )
              .min(1)
              .required(),
          })
        )
        .min(0)
        .required(),
    }),
  },
  getCourseById: {
    params: Joi.object({
      courseId: Joi.string().required().custom(objectId).messages({
        "any.required": CART.COURSE_ID_REQUIRED,
        "any.invalid": CART.INVALID_COURSEID,
      }),
    }),
  },
};

module.exports = courseValidation;
