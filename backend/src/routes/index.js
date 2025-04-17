const { Router } = require("express");

const router = Router();
const authRoutes = require("./auth.routes");
const courseRoutes = require("./course.routes");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/course",
    route: courseRoutes
  }
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
