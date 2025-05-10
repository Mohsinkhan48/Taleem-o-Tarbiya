const { ROLES } = require("../constants");
const { CourseCategory, Role, CourseLevel, CourseTag } = require("../models");

const StaticService = {
  getCourseCategories: async () => {
    return await CourseCategory.find();
  },

  getCourseTags: async () => {
    return await CourseTag.find();
  },

  getCourseLevels: async () => {
    return await CourseLevel.find();
  },

  getRoles: async () => {
    return await Role.find({ name: { $ne: ROLES.ADMIN } });
  }  
};

module.exports = StaticService;
