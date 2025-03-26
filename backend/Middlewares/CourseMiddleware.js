const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Required" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Invalid or Expired" });
    }
};

// ✅ Middleware to check if user is an instructor (teacher)
const isInstructor = (req, res, next) => {
    if (!req.user || req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access Denied. Only instructors can perform this action." });
    }
    next();
};

module.exports = { isAuthenticated, isInstructor };
