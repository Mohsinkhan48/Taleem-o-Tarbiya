const multer = require("multer");

const memoryUpload = multer({ storage: multer.memoryStorage() });

const parseFormDataFields = (req, res, next) => {
  const upload = memoryUpload.fields([
    { name: "moduleId", maxCount: 1 },
    { name: "chapterId", maxCount: 1 },
    { name: "title", maxCount: 1 },
    { name: "description", maxCount: 1 },
    // Don't include `video` here — we’ll handle that in controller
  ]);

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }

    // Flatten the fields: convert file arrays to plain strings
    for (const key in req.body) {
      if (Array.isArray(req.body[key])) {
        req.body[key] = req.body[key][0];
      }
    }

    next();
  });
};

module.exports = parseFormDataFields;
