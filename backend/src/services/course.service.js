const { default: mongoose } = require("mongoose");
const {
  Course,
  Module,
  Chapter,
  Quiz,
  Assignment,
  Enrollment,
} = require("../models");

const courseService = {
  createCourse: async (courseData, instructor_id) => {
    try {
      const {
        image,
        title,
        description,
        content,
        duration,
        price,
        level,
        category,
        isPaid,
        modules,
        tags,
      } = courseData;

      const createdModules = [];

      // Step 1: Create Course first (so we have the course ID)
      const course = await Course.create({
        image,
        title,
        description,
        content,
        duration,
        price,
        instructor: instructor_id,
        level,
        category,
        tags,
        isPaid,
        modules: [], // Initially empty modules array
      });

      // Step 2: Loop through modules and create them with the course reference
      for (const moduleData of modules) {
        const createdChapters = [];

        // Step 3: Create Module and associate it with the course
        const module = await Module.create({
          title: moduleData.title,
          course: course._id, // Add course reference here
        });

        // Step 4: Loop through chapters and create them
        for (const chapterData of moduleData.chapters) {
          let quiz = null;
          let assignment = null;

          // Step 5: Create Quiz (if exists)
          if (chapterData.quiz) {
            quiz = await Quiz.create(chapterData.quiz);
          }

          // Step 6: Create Assignment (if exists)
          if (chapterData.assignment) {
            assignment = await Assignment.create(chapterData.assignment);
          }

          // Step 7: Create Chapter and associate it with the created module
          const chapter = await Chapter.create({
            title: chapterData.title,
            content: chapterData.content,
            videoUrl: chapterData.videoUrl,
            isPreview: chapterData.isPreview || false,
            resources: chapterData.resources || [],
            quiz: quiz?._id,
            assignment: assignment?._id,
            module: module._id, // Associate chapter with module
          });

          createdChapters.push(chapter._id);
        }

        // Step 8: After creating chapters, update the module with the chapters
        await Module.findByIdAndUpdate(module._id, {
          chapters: createdChapters,
        });

        createdModules.push(module._id);
      }

      // Step 9: Now update the Course with the created module references
      const updatedCourse = await Course.findByIdAndUpdate(course._id, {
        modules: createdModules,
      });

      return updatedCourse;
    } catch (error) {
      console.error(error)
      throw new Error("Failed to create course. Please try again later.");
    }
  },
  getAllCourses: async (filters = {}) => {
    return await Course.find(filters)
      .populate("instructor", "_id fullName email")
      .populate("tags")
      .populate("category")
      .populate("level")
      .populate({
        path: "modules",
        populate: {
          path: "chapters",
          select: "_id title content",
        },
      });
  },
  getCoursesNotEnrolledByStudent: async (studentId, filters = {}) => {
    const enrolledCourseIds = await Enrollment.find({
      student: studentId,
    }).distinct("course");

    return await Course.find({
      ...filters,
      _id: { $nin: enrolledCourseIds }, // exclude enrolled courses
    })
      .populate("instructor", "_id fullName email")
      .populate("tags")
      .populate("category")
      .populate("level")
      .populate({
        path: "modules",
        populate: {
          path: "chapters",
          select: "_id title content",
        },
      });
  },
  getCourseById: async (courseId) => {
    return await Course.findById(courseId)
      .populate("instructor", "_id fullName email")
      .populate("tags")
      .populate("category")
      .populate("level")
      .populate({
        path: "modules",
        populate: {
          path: "chapters",
          select: "_id title content",
          populate: [
            {
              path: "quiz",
              select: "_id title",
            },
            {
              path: "assignment",
              select: "_id title",
            },
          ],
        },
      });
  },
  getCoursesByInstructorId: async (instructorId) => {
    return await Course.find({ instructor: instructorId }).populate(
      "instructor",
      "fullName email"
    );
  },
  getCoursesByStudentId: async (studentId) => {
    const enrollments = await Enrollment.find({ student: studentId }).populate({
      path: "course",
      populate: [
        {
          path: "instructor",
          select: "_id fullName email",
        },
        {
          path: "tags",
        },
        {
          path: "category",
        },
        {
          path: "level",
        },
        {
          path: "modules",
          populate: {
            path: "chapters",
            populate: [
              {
                path: "quiz",
                select: "_id title questions",
              },
              {
                path: "assignment",
                select: "_id title description",
              },
            ],
          },
        },
      ],
    });

    const courses = enrollments.map((enrollment) => enrollment.course);
    return courses;
  },
  getStudentEnrolledCourse: async (studentId, courseId) => {
    const enrollment = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    }).populate({
      path: "course",
      populate: [
        {
          path: "instructor",
          select: "_id fullName email",
        },
        {
          path: "tags",
        },
        {
          path: "category",
        },
        {
          path: "level",
        },
        {
          path: "modules",
          populate: {
            path: "chapters",
            populate: [
              { path: "resources" },
              { path: "quiz" },
              { path: "assignment" },
            ],
          },
        },
      ],
    });
    if (!enrollment || !enrollment.course) {
      return null;
    }

    return enrollment.course;
  },
  updateThumbnail: async (courseId, thumbnailPath) => {
    return await Course.findByIdAndUpdate(courseId, { image: thumbnailPath }, { new: true });
  }
};

module.exports = courseService;
