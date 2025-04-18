const { Router } = require("express");

const router = Router();
const authRoutes = require("./auth.routes");
const courseRoutes = require("./course.routes");
const enrollmentRoutes = require("./enrollment.routes");
const cartRoutes = require("./cart.routes");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/course",
    route: courseRoutes
  },
  {
    path: "/enrollment",
    route: enrollmentRoutes
  },
  {
    path: "/cart",
    route: cartRoutes
  }
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
