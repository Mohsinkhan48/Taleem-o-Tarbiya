const { default: mongoose } = require("mongoose");
const {
  Course,
  Module,
  Chapter,
  Quiz,
  Assignment,
  Enrollment,
  LectureProgress,
  CourseProgress,
  Lecture,
  User,
  ChapterProgress,
} = require("../models");
const fs = require("fs");
const path = require("path");
const chrome = require("html-pdf-chrome");
const generateTemplate = require("../email-templates/certificate.template");

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
      if (modules) {
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
            if (chapterData.quiz && chapterData.quiz.title) {
              quiz = await Quiz.create(chapterData.quiz);
            }

            // Step 6: Create Assignment (if exists)
            if (
              chapterData.assignment &&
              chapterData.assignment.title &&
              chapterData.assignment.description
            ) {
              assignment = await Assignment.create(chapterData.assignment);
            }

            // Step 7: Create Chapter and associate it with the created module
            const chapter = await Chapter.create({
              title: chapterData.title,
              content: chapterData.content,
              lecture: chapterData?.lecture,
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
      }

      // Step 9: Now update the Course with the created module references
      const updatedCourse = await Course.findByIdAndUpdate(course._id, {
        modules: createdModules,
      });

      return updatedCourse;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create course. Please try again later.");
    }
  },
  updateCourse: async (courseData) => {
    const {
      courseId,
      image,
      title,
      description,
      content,
      duration,
      price,
      level,
      category,
      isPaid,
      tags,
      modules, // <-- accept modules here
    } = courseData;

    // Step 1: Update the course basic info
    const course = await Course.findByIdAndUpdate(
      courseId,
      {
        image,
        title,
        description,
        content,
        duration,
        price,
        level,
        category,
        tags,
        isPaid,
      },
      { new: true }
    );

    if (!course) {
      throw new Error("Course not found");
    }

    // Optional: Clean up old modules (and their children)
    const oldModules = await Module.find({ course: courseId });
    for (const mod of oldModules) {
      const chapters = await Chapter.find({ module: mod._id });

      for (const chap of chapters) {
        if (chap.quiz) await Quiz.findByIdAndDelete(chap.quiz);
        if (chap.assignment)
          await Assignment.findByIdAndDelete(chap.assignment);
        await Chapter.findByIdAndDelete(chap._id);
      }

      await Module.findByIdAndDelete(mod._id);
    }

    const createdModules = [];

    if (modules && modules.length > 0) {
      for (const moduleData of modules) {
        const createdChapters = [];

        const module = await Module.create({
          title: moduleData.title,
          course: courseId,
        });

        for (const chapterData of moduleData.chapters) {
          let quiz = null;
          let assignment = null;

          if (chapterData.quiz) {
            quiz = await Quiz.create(chapterData.quiz);
          }

          if (
            chapterData.assignment &&
            chapterData.assignment.title &&
            chapterData.assignment.description
          ) {
            assignment = await Assignment.create(chapterData.assignment);
          }

          const chapter = await Chapter.create({
            title: chapterData.title,
            content: chapterData.content,
            lecture: chapterData?.lecture,
            isPreview: chapterData.isPreview || false,
            resources: chapterData.resources || [],
            quiz: quiz?._id,
            assignment: assignment?._id,
            module: module._id,
          });

          createdChapters.push(chapter._id);
        }

        await Module.findByIdAndUpdate(module._id, {
          chapters: createdChapters,
        });

        createdModules.push(module._id);
      }

      await Course.findByIdAndUpdate(courseId, {
        modules: createdModules,
      });
    }

    return await Course.findById(courseId)
      .populate("modules")
      .populate({
        path: "modules",
        populate: {
          path: "chapters",
          populate: ["quiz", "assignment"],
        },
      });
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
  getInstructorCourseById: async (courseId) => {
    return await Course.findById(courseId).populate([
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
            { path: "lecture" },
          ],
        },
      },
    ]);
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
        { path: "instructor", select: "_id fullName email" },
        { path: "tags" },
        { path: "category" },
        { path: "level" },
        {
          path: "modules",
          populate: {
            path: "chapters",
            populate: [
              { path: "quiz", select: "_id title questions" },
              { path: "assignment", select: "_id title description" },
            ],
          },
        },
      ],
    });

    const courses = enrollments.map((enrollment) => enrollment.course);

    const updatedCourses = await Promise.all(
      courses.map(async (course) => {
        // ✅ Get total number of chapters across all modules
        const totalChapters = course.modules.reduce((acc, module) => {
          return acc + (module.chapters?.length || 0);
        }, 0);

        const courseProgress = await CourseProgress.findOne({
          user: studentId,
          course: course._id,
        });

        // ✅ Safe handling if no progress yet
        const completedChaptersCount =
          courseProgress?.completedChapters?.length || 0;

        // ✅ Avoid divide by zero
        const progressPercentage =
          totalChapters > 0
            ? (completedChaptersCount / totalChapters) * 100
            : 0;

        return {
          ...course.toObject(),
          progress:
            Math.round(progressPercentage) > 100
              ? 100
              : Math.round(progressPercentage), // optional: round percentage
        };
      })
    );
    return updatedCourses;
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
              { path: "lecture" },
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

    const course = enrollment.course;

    for (const module of course.modules) {
      for (const chapter of module.chapters) {
        if (chapter.lecture) {
          const lecture = chapter.lecture.toObject
            ? chapter.lecture.toObject()
            : chapter.lecture;

          // 🔍 Check lecture progress
          const lectureProgress = await LectureProgress.findOne({
            user: studentId,
            lecture: chapter.lecture._id,
            chapter: chapter._id,
            course: courseId,
            module: module._id,
          });

          lecture.progress = lectureProgress || null;

          const videoUrl = lecture.videoUrl || "";
          let hasVideo = false;

          console.log("🔍 Checking lecture video:", {
            title: lecture.title,
            videoUrl,
          });

          if (videoUrl.startsWith("/uploads/")) {
            const relativePath = videoUrl.replace(/^\/uploads[\/\\]?/, ""); // remove leading "/uploads/"
            const uploadsBasePath = path.join(process.cwd(), "src", "uploads"); // project root -> src/uploads
            const absoluteVideoPath = path.join(uploadsBasePath, relativePath);

            console.log("📂 Relative video path:", relativePath);
            console.log("📂 Uploads base path:", uploadsBasePath);
            console.log("📂 Absolute full path to check:", absoluteVideoPath);
            try {
              const exists = fs.existsSync(absoluteVideoPath);
              if (exists) {
                hasVideo = true;
                console.log(`✅ Video file exists: ${lecture.title}`);
              } else {
                hasVideo = false;
                console.log(
                  `❌ Video file does NOT exist: ${absoluteVideoPath}`
                );
              }
            } catch (err) {
              hasVideo = false;
              console.error(
                `❌ Error checking video file: ${absoluteVideoPath}`,
                err
              );
            }
          } else {
            console.log(
              "⚠️ Video URL does not start with '/uploads/', skipping check."
            );
          }

          lecture.hasVideo = hasVideo;

          chapter.lecture = lecture;
        }
      }
    }

    return course;
  },
  getTeacherDashboard: async (teacherId) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // 1. Get all courses by this teacher
    const courses = await Course.find({ instructor: teacherId }).select(
      "_id title ratings"
    );

    const courseIds = courses.map((course) => course._id);

    // 2. Enrollments
    const enrollmentsCount = await Enrollment.countDocuments({
      course: { $in: courseIds },
    });

    const enrollmentsLast30Days = await Enrollment.countDocuments({
      course: { $in: courseIds },
      createdAt: { $gte: thirtyDaysAgo },
    });

    // 3. Count lectures and duration
    const modules = await Module.find({ course: { $in: courseIds } }).select(
      "_id"
    );
    const moduleIds = modules.map((m) => m._id);

    const chapters = await Chapter.find({ module: { $in: moduleIds } }).select(
      "lecture"
    );
    const lectureIds = chapters.map((c) => c.lecture).filter(Boolean);

    const lecturesProgresses = await LectureProgress.find({
      lecture: { $in: lectureIds },
    }).select("currentTime createdAt");
    const lectureCount = lecturesProgresses.length;
    const lectureCountLast30Days = lecturesProgresses.filter(
      (l) => l.createdAt >= thirtyDaysAgo
    ).length;

    const totalLearningSeconds = lecturesProgresses.reduce(
      (sum, lec) => sum + (lec.currentTime || 0),
      0
    );
    const totalLearningHours = +(totalLearningSeconds / 3600).toFixed(2);

    const totalLearningSeconds30 = lecturesProgresses
      .filter((l) => l.createdAt >= thirtyDaysAgo)
      .reduce((sum, lec) => sum + (lec.currentTime || 0), 0);
    const totalLearningHours30 = +(totalLearningSeconds30 / 3600).toFixed(2);

    // 4. Course progress entries (lectures started by students)
    const progressEntries = await LectureProgress.find({
      course: { $in: courseIds },
    }).select("createdAt");

    const lecturesTaken = progressEntries.length;
    const lecturesTaken30 = progressEntries.filter(
      (p) => p.createdAt >= thirtyDaysAgo
    ).length;

    // 5. Average ratings per course (optional)
    const averageRatings = courses.map((c) => {
      const avg =
        c.ratings.length > 0
          ? +(
              c.ratings.reduce((sum, r) => sum + r, 0) / c.ratings.length
            ).toFixed(2)
          : null;
      return { courseId: c._id, title: c.title, avgRating: avg };
    });

    return {
      totalCourses: courses.length,
      totalEnrollments: enrollmentsCount,
      enrollmentsLast30Days,
      totalLectures: lectureCount,
      lecturesLast30Days: lectureCountLast30Days,
      totalLearningHours,
      learningHoursLast30Days: totalLearningHours30,
      lecturesTaken,
      lecturesTakenLast30Days: lecturesTaken30,
      averageRatings,
    };
  },
  updateThumbnail: async (courseId, thumbnailPath) => {
    return await Course.findByIdAndUpdate(
      courseId,
      { image: thumbnailPath },
      { new: true }
    );
  },
  addChapterToModule: async (moduleId, chapterData) => {
    let quiz = null;
    if (chapterData.quiz) {
      quiz = await Quiz.create(chapterData.quiz);
    }

    // Step 2: Create assignment if present
    let assignment = null;
    if (chapterData.assignment) {
      assignment = await Assignment.create(chapterData.assignment);
    }

    // Step 3: Create the chapter
    const chapter = await Chapter.create({
      title: chapterData.title,
      content: chapterData.content,
      lecture: chapterData?.lecture,
      isPreview: chapterData.isPreview || false,
      resources: chapterData.resources || [],
      quiz: quiz?._id,
      assignment: assignment?._id,
      module: moduleId,
    });

    // Step 4: Update the module to include this new chapter
    await Module.findByIdAndUpdate(moduleId, {
      $push: { chapters: chapter._id },
    });

    return chapter;
  },
  checkCourseCompletion: async (studentId, courseId) => {
    const progress = await CourseProgress.findOne({
      user: studentId,
      course: courseId,
    });
    console.log("progress", progress);
    if (!progress || !progress.completed) {
      return {
        completed: false,
        reason: "Course lectures are not fully completed.",
      };
    }

    // Step 1: Get all chapters of this course (through modules) that have a quiz
    const course = await Course.findById(courseId).populate({
      path: "modules",
      populate: {
        path: "chapters",
        match: { quiz: { $ne: null } }, // only include chapters with quizzes
      },
    });

    // Flatten chapters from all modules
    const chaptersWithQuiz = course.modules.flatMap(
      (mod) => mod.chapters || []
    );

    // Step 2: Check if user completed the quiz for each of those chapters
    for (const chapter of chaptersWithQuiz) {
      const chapterProgress = await ChapterProgress.findOne({
        user: studentId,
        chapter: chapter._id,
        quizCompleted: true,
      });

      if (!chapterProgress) {
        return {
          completed: false,
          reason: `Quiz not completed for chapter: "${chapter.title}".`,
        };
      }
    }

    // All validations passed
    return {
      completed: true,
      reason: "Course fully completed.",
    };
  },
  generateCertificatePDF: async (studentId, courseId) => {
    const progress = await CourseProgress.findOne({
      user: studentId,
      course: courseId,
    });

    if (progress && progress?.certificateUrl) return progress.certificateUrl;

    const user = await User.findById(studentId);
    const course = await Course.findById(courseId)
      .populate("instructor", "fullName")
      .populate("level");
    const html = generateTemplate(
      user.fullName,
      course,
      course.instructor.fullName,
      (progress && progress?.completedAt) || new Date().toLocaleDateString()
    );

    const certificateDir = path.join(
      __dirname,
      "..",
      "uploads",
      "certificates",
      `Student_${studentId}`,
      `Course_${courseId}`
    );
    fs.mkdirSync(certificateDir, { recursive: true });

    const filePath = path.join(certificateDir, `certificate.pdf`);

    const pdf = await chrome.create(html, { printOptions: { format: "A4" } });
    fs.writeFileSync(filePath, pdf.toBuffer());

    const relativePath = `/uploads/certificates/Student_${studentId}/Course_${courseId}/certificate.pdf`;

    // ✅ Save the certificate URL to CourseProgress
    if (progress) {
      progress.certificateUrl = relativePath;
      await progress.save();
    } else {
      await CourseProgress.create({
        user: studentId,
        course: courseId,
        completed: true,
        completedAt: new Date(),
        certificateUrl: relativePath,
      });
    }

    return relativePath;
  },
};

module.exports = courseService;
