const multer = require("multer");
const path = require("path");
const fs = require("fs");

const getThumbnailUploader = (teacherId, courseId) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(
        __dirname,
        "..",
        "uploads",
        "Teacher_" + teacherId.toString(),
        "Course_" + courseId.toString()
      );

      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `thumbnail${ext}`);
    },
  });

  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (allowedTypes.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Only .jpeg, .png, .webp files are allowed."));
    },
    limits: {
      fileSize: 2 * 1024 * 1024, // 2MB
    },
  });
};

const getVideoUploader = (teacherId, courseId, moduleId, chapterId) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(
        __dirname,
        "..",
        "uploads",
        "videos",
        "Teacher_" + teacherId.toString(),
        "Course_" + courseId.toString(),
        "Module_" + moduleId.toString(),
        "Chapter_" + chapterId.toString()
      );
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
      const timestamp = Date.now();
      const uniqueName = `${name}_${timestamp}${ext}`;
      cb(null, uniqueName);
   },   
  });

  return multer({
    storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["video/mp4", "video/mkv", "video/webm"];
      if (allowedTypes.includes(file.mimetype)) cb(null, true);
      else cb(new Error("Only .mp4, .mkv, .webm files are allowed."));
    },
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB limit (adjust as needed)
    },
  });
};
const getPreviewVideoUploader = (teacherId, courseId) => {
  const uploadPath = path.join(
    __dirname,
    "..",
    "uploads",
    "teachers",
    `${teacherId}`,
    "courses",
    `${courseId}`,
    "preview"
  );

  fs.mkdirSync(uploadPath, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const uniqueName = `preview-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  });

  return multer({
    storage,
    limits: {
      fileSize: 300 * 1024 * 1024, // 300MB
    },
    fileFilter: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (![".mp4", ".mov", ".avi", ".mkv"].includes(ext)) {
        return cb(new Error("Only video files are allowed!"));
      }
      cb(null, true);
    },
  });
}
module.exports = { getThumbnailUploader, getVideoUploader, getPreviewVideoUploader };
