const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const routes = require("./routes");
const stripeRoutes = require("./routes/stripe.routes"); // ✅ import
const { R5XX } = require("./Responses");

const app = express();

app.set("view engine", "ejs");

// ✅ Register Stripe webhook route with raw body parser FIRST
app.use("/backend/api/stripe", express.raw({ type: "application/json" }), stripeRoutes);

// ✅ Then proceed with JSON parsing for all other routes
app.use(express.json());
app.use(cors());
app.set("trust proxy", true);
app.use(morgan("tiny"));

// ✅ All other endpoints (REST APIs)
app.use("/backend/api", routes);

// ✅ Public files if any
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// ✅ Error catcher
app.use((error, req, res, next) => {
  console.log(error);
  R5XX(res, { error: error?.message });
});

module.exports = app;
