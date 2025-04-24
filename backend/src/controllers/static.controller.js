// static.controller.js
const { R2XX, R4XX } = require("../Responses");
const { staticService } = require("../services");
const { catchAsync } = require("../utils");

const StaticController = {
  getCourseCategories: catchAsync(async (req, res) => {
    const categories = await staticService.getCourseCategories();
    if (!categories || categories.length === 0)
      return R4XX(res, 404, "No course categories found");
    R2XX(res, "Course categories fetched successfully", 200, { data: categories });
  }),

  getCourseTags: catchAsync(async (req, res) => {
    const tags = await staticService.getCourseTags();
    if (!tags || tags.length === 0)
      return R4XX(res, 404, "No course tags found");
    R2XX(res, "Course tags fetched successfully", 200, { data: tags });
  }),

  getCourseLevels: catchAsync(async (req, res) => {
    const levels = await staticService.getCourseLevels();
    if (!levels || levels.length === 0)
      return R4XX(res, 404, "No course levels found");
    R2XX(res, "Course levels fetched successfully", 200, { data: levels });
  }),

  getRoles: catchAsync(async (req, res) => {
    const roles = await staticService.getRoles();
    if (!roles || roles.length === 0)
      return R4XX(res, 404, "No roles found");
    R2XX(res, "Roles fetched successfully", 200, { data: roles });
  }),
};

module.exports = StaticController;
