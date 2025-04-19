const { R2XX, R4XX } = require("../Responses");
const { courseService } = require("../services");
const { catchAsync } = require("../utils");

const courseController = {
  createCourse: catchAsync(async (req, res) => {
    const newCourse = await courseService.createCourse(req.body, req.user);
    if (!newCourse) return R4XX(res, 400, "Failed to create course");

    R2XX(res, "Course created successfully", 201, { course: newCourse });
  }),
  getAllCourses: catchAsync(async (req, res) => {
    const courses = await courseService.getAllCourses();
    R2XX(res, "Fetched all courses successfully", 200, { courses });
  }),
  getCourseById: catchAsync(async (req, res) => {
    const { courseId } = req.params;
  
    const course = await courseService.getCourseById(courseId);
  
    if (!course) {
      return R4XX(res, "Course not found", 404);
    }
  
    R2XX(res, "Fetched course successfully", 200, { course });
  }),  
  getCoursesByInstructor: catchAsync(async (req, res) => {
    const instructorId = req.params.instructorId || req.user; // either from route param or logged-in user
    console.log(req.user)
    const courses = await courseService.getCoursesByInstructorId(instructorId);

    if (!courses || courses.length === 0) {
      return R4XX(res, 404, "No courses found for this instructor");
    }

    R2XX(res, "Fetched instructor courses successfully", 200, { courses });
  }),
};

module.exports = courseController;
