const { ROLES } = require("../constants");
const { CourseFilters } = require("../filters/course.filters");
const { Lecture, Chapter } = require("../models");
const { R2XX, R4XX } = require("../Responses");
const { courseService } = require("../services");
const { catchAsync, getOptionalUserFromRequest } = require("../utils");
const {
  getThumbnailUploader,
  getVideoUploader,
} = require("../utils/multer.utils");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffprobePath = require("@ffprobe-installer/ffprobe").path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const courseController = {
  createCourse: catchAsync(async (req, res) => {
    const newCourse = await courseService.createCourse(req.body, req.user);
    if (!newCourse) return R4XX(res, 400, "Failed to create course");
    R2XX(res, "Course created successfully", 201, { course: newCourse });
  }),
  updateCourse: catchAsync(async (req, res) => {
    const newCourse = await courseService.updateCourse(req.body);
    if (!newCourse) return R4XX(res, 400, "Failed to update course");
    R2XX(res, "Course updated successfully", 201, { course: newCourse });
  }),
  addChapterToModule: catchAsync(async (req, res) => {
    const { moduleId, chapter } = req.body;
    const newModule = await courseService.addChapterToModule(moduleId, chapter);
    if (!newModule) return R4XX(res, 400, "Failed to update module");
    R2XX(res, "Module updated successfully", 201, { module: newModule });
  }),
  uploadThumbnail: catchAsync(async (req, res, next) => {
    const { courseId } = req.params;
    const teacherId = req.user;
    if (!teacherId || !courseId) {
      return R4XX(res, 400, "Missing teacherId or courseId in query");
    }

    const upload = getThumbnailUploader(teacherId, courseId);
    const uploadSingle = upload.single("thumbnail");

    uploadSingle(req, res, async (err) => {
      if (err) return R4XX(res, 400, err.message);

      const relativeUrl = `/uploads/Teacher_${teacherId}/Course_${courseId}/${req.file.filename}`;

      const updatedCourse = await courseService.updateThumbnail(
        courseId,
        relativeUrl
      );

      if (!updatedCourse) {
        return R4XX(res, 404, "Course not found");
      }

      R2XX(res, "Thumbnail uploaded successfully", 200, {
        thumbnailUrl: relativeUrl,
      });
    });
  }),
  uploadLectureVideo: catchAsync(async (req, res, next) => {
    const { courseId, moduleId, chapterId } = req.params;
    const teacherId = req.user;

    const upload = getVideoUploader(teacherId, courseId, moduleId, chapterId);
    const uploadSingle = upload.single("video");

    uploadSingle(req, res, async (err) => {
      if (err) {
        console.error("❌ Upload error:", err);
        return R4XX(res, 400, err.message);
      }

      const absolutePath = req.file.path;
      const relativePath = path
        .relative(path.join(__dirname, ".."), absolutePath)
        .replace(/\\/g, "/"); // Use forward slashes for URLs

      if (!fs.existsSync(absolutePath)) {
        console.error("❌ File does not exist:", absolutePath);
        return R4XX(res, 500, "File does not exist at the specified path.");
      }

      ffmpeg.ffprobe(absolutePath, async (err, metadata) => {
        if (err) {
          console.error("❌ ffprobe failed:", err.message);
          return R4XX(res, 500, "Failed to extract video metadata.");
        }

        const format = metadata.format;
        const stream = metadata.streams.find((s) => s.codec_type === "video");

        const newLectureData = {
          title: req.body.title || req.file.originalname,
          description: req.body.description || "",
          chapter: chapterId,
          videoUrl: `/${relativePath}`,
          duration: Math.round(format.duration),
          size: format.size,
          format: format.format_name,
          resolution: stream ? `${stream.width}x${stream.height}` : "Unknown",
        };

        // 🔄 Check if a lecture for this chapter already exists
        const existingLecture = await Lecture.findOne({ chapter: chapterId });

        // After saving the new or updated lecture...
        if (existingLecture) {
          // 🧹 Delete previous video file
          const oldAbsolutePath = path.join(
            __dirname,
            "..",
            existingLecture.videoUrl.replace(/\//g, path.sep)
          );

          if (fs.existsSync(oldAbsolutePath)) {
            fs.unlinkSync(oldAbsolutePath);
            console.log("🗑️ Deleted old video at:", oldAbsolutePath);
          }

          // 🔁 Update lecture
          Object.assign(existingLecture, newLectureData);
          await existingLecture.save();

          // 📝 Update chapter's lecture field (if not already set)
          await Chapter.findByIdAndUpdate(chapterId, {
            lecture: existingLecture._id,
          });

          return R2XX(res, "Lecture updated successfully", 200, {
            lecture: existingLecture,
          });
        }

        // ➕ Create new lecture
        const newLecture = new Lecture(newLectureData);
        await newLecture.save();

        // ✅ Update chapter's lecture field
        await Chapter.findByIdAndUpdate(chapterId, {
          lecture: newLecture._id,
        });

        return R2XX(res, "Lecture uploaded successfully", 201, {
          lecture: newLecture,
        });
      });
    });
  }),
  getCertificate: catchAsync(async (req, res, next) => {
    const studentId = req.user;
    const { courseId } = req.params;

    // You can add a progress check service here if needed:
    const {completed, reason} = await courseService.checkCourseCompletion(
      studentId,
      courseId
    );
    if (!completed) return R2XX(res, "Course is not competed yet.", 200, {
      isCertificate: false,
      notcompletionReason: reason
    });

    const filePath = await courseService.generateCertificatePDF(
      studentId,
      courseId
    );

    return R2XX(res, "Certificate generated successfully", 200, {
      certificateUrl: filePath,
      isCertificate: true,
    });
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
  getInstructorCourseById: catchAsync(async (req, res) => {
    const { courseId } = req.params;

    const course = await courseService.getInstructorCourseById(courseId);

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
    const studentId = req.user;
    const course = await courseService.getStudentEnrolledCourse(
      studentId,
      courseId
    );

    if (!course) {
      return R4XX(res, 404, "Course not found");
    }
    R2XX(res, "Fetched course successfully", 200, { course });
  }),
  getTeacherDashboard: catchAsync(async (req, res) => {
    const teacherId = req.user;
    const teacherDashboardData = await courseService.getTeacherDashboard(
      teacherId
    );
    R2XX(res, "Fetched teacher dashboard successfully", 200, {
      data: teacherDashboardData,
    });
  }),
};

module.exports = courseController;
