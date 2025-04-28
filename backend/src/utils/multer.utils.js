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
        teacherId.toString(),
        courseId.toString()
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

module.exports = { getThumbnailUploader };
