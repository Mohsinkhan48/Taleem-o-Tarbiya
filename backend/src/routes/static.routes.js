const { Router } = require("express");
const { staticController } = require("../controllers");

const router = Router();

router.get("/course-categories", staticController.getCourseCategories);
router.get("/course-levels", staticController.getCourseLevels);
router.get("/course-tags", staticController.getCourseTags);
router.get("/roles", staticController.getRoles);

module.exports = router;