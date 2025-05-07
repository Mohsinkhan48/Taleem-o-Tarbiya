const Joi = require("joi");
const { objectId } = require("./custom.validation");
const { CART } = require("../constants");

const courseValidation = {
  createCourse: {
    body: Joi.object({
      image: Joi.string().optional(),
      title: Joi.string().trim().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      duration: Joi.string().required(),
      price: Joi.number().min(0).required(),
      level: Joi.custom(objectId).required(),
      category: Joi.custom(objectId).required(),
      tags: Joi.array().items(Joi.custom(objectId)).min(0).required(),
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
                  lecture: Joi.custom(objectId).optional(),
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
  updateCourse: {
    body: Joi.object({
      courseId: Joi.string().required().custom(objectId).messages({
        "any.required": CART.COURSE_ID_REQUIRED,
        "any.invalid": CART.INVALID_COURSEID,
      }),
      title: Joi.string().trim().required(),
      description: Joi.string().required(),
      content: Joi.string().required(),
      duration: Joi.string().required(),
      price: Joi.number().min(0).required(),
      level: Joi.custom(objectId).required(),
      category: Joi.custom(objectId).required(),
      tags: Joi.array().items(Joi.custom(objectId)).min(0).required(),
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
                  lecture: Joi.custom(objectId).optional(),
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
    }),
  },
  addChapterToModule: {
    body: Joi.object({
      moduleId: Joi.string().required().custom(objectId).messages({
        "any.required": "Module ID is required",
        "any.invalid": "Invalid Module ID",
      }),
      chapter: Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        lecture: Joi.custom(objectId).optional(),
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
      }).required(),
    }),
  },
  uploadLectureVideo: {
    body: Joi.object({
      title: Joi.string().optional(),
      description: Joi.string().optional(),
    }),
    params: Joi.object({
      courseId: Joi.string().required().custom(objectId),
      moduleId: Joi.string().required().custom(objectId),
      chapterId: Joi.string().required().custom(objectId),
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
