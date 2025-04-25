const { ROLES } = require("../constants");
const { CourseFilters } = require("../filters/course.filters");
const { R2XX, R4XX } = require("../Responses");
const { courseService } = require("../services");
const {
  catchAsync,
  getOptionalUserFromRequest,
} = require("../utils");

const courseController = {
  createCourse: catchAsync(async (req, res) => {
    const newCourse = await courseService.createCourse(req.body, req.user);
    if (!newCourse) return R4XX(res, 400, "Failed to create course");

    R2XX(res, "Course created successfully", 201, { course: newCourse });
  }),
  getAllCourses: catchAsync(async (req, res) => {
    const filters = CourseFilters(req.query);
    const user = await getOptionalUserFromRequest(req);
    let courses;

    if (user?.role?.name === ROLES.STUDENT) {
      courses = await courseService.getCoursesNotEnrolledByStudent(
        user._id,
        filters
      );
    } else {
      courses = await courseService.getAllCourses(filters);
    }

    R2XX(res, "Fetched all courses successfully", 200, { courses });
  }),

  getCourseById: catchAsync(async (req, res) => {
    const { courseId } = req.params;

    const course = await courseService.getCourseById(courseId);

    if (!course) {
      return R4XX(res, 404, "Course not found");
    }

    R2XX(res, "Fetched course successfully", 200, { course });
  }),
  getCoursesByInstructor: catchAsync(async (req, res) => {
    const instructorId = req.params.instructorId || req.user; // either from route param or logged-in user
    const courses = await courseService.getCoursesByInstructorId(instructorId);
    R2XX(res, "Fetched instructor courses successfully", 200, { courses });
  }),
  getCoursesByStudent: catchAsync(async (req, res) => {
    const studentId = req.user;
    const courses = await courseService.getCoursesByStudentId(studentId);
    R2XX(res, "Fetched student courses successfully", 200, { data: courses });
  }),
  getStudentEnrolledCourse: catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const studentId  = req.user;
    console.log(courseId)
    const course = await courseService.getStudentEnrolledCourse(studentId, courseId);

    if (!course) {
      return R4XX(res, 404, "Course not found");
    }
    R2XX(res, "Fetched course successfully", 200, { course });
  }),
}

module.exports = courseController;
