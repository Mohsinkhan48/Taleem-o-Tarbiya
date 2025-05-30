const mongoose = require("mongoose");
const app = require("../index");
const { envConfig, mongoConfig } = require("../config/");
const seedRoles = require("../seeders/role.seeder");
const seedCourseCategories = require("../seeders/course-category.seeder");
const seedCourseTags = require("../seeders/course-tag.seeder");
const seedCourseLevels = require("../seeders/course-level.seeder");
// ---------------------------------------------------------------------------->>
let server = null;

mongoose
  .connect(mongoConfig.url, mongoConfig.options)
  .then(() => {
    console.log("Connected to MongoDB");
    seedRoles();
    seedCourseCategories();
    seedCourseTags();
    seedCourseLevels();
    server = app.listen(envConfig.PORT, () => {
      console.log(`Listening to port ${server.address().port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect database.\n" + err);
  });
// ---------------------------------------------------------------------------->>
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};
// ---------------------------------------------------------------------------->>
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
