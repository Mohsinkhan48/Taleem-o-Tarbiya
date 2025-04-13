const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/CourseController");
const { isAuthenticated, isInstructor } = require("../Middlewares/CourseMiddleware");
const { upload } = require('../Controllers/CourseController');

// ✅ Public Routes
router.get("/courses", courseController.getAllCourses);
router.get("/courses/:id", courseController.getCourseById);
// ✅ Get instructor's own courses (protected)
router.get("/instructor/courses", isAuthenticated, isInstructor, courseController.getCoursesByInstructor);



// ✅ Protected Routes (Instructor-only)
router.post("/courses", isAuthenticated, isInstructor, upload.single("image"), courseController.createCourse);
router.put("/courses/:id", isAuthenticated, isInstructor, upload.single("image"), courseController.updateCourse);
router.delete("/courses/:id", isAuthenticated, isInstructor, courseController.deleteCourse);

module.exports = router;
