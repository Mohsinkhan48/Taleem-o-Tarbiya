const { Router } = require("express");

const router = Router();
const authRoutes = require("./auth.routes");
const staticRoutes = require("./static.routes");
const courseRoutes = require("./course.routes");
const enrollmentRoutes = require("./enrollment.routes");
const cartRoutes = require("./cart.routes");
const paymentRoutes = require("./payment.routes");
const stripeRoutes = require("./stripe.routes");
const progressRoutes = require("./progress.routes");
const adminRoutes = require("./admin.routes");

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/course",
    route: courseRoutes,
  },
  {
    path: "/enrollment",
    route: enrollmentRoutes,
  },
  {
    path: "/cart",
    route: cartRoutes,
  },
  {
    path: "/progress",
    route: progressRoutes,
  },
  {
    path: "/payment",
    route: paymentRoutes,
  },
  {
    path: "/static",
    route: staticRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  }
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

module.exports = router;
