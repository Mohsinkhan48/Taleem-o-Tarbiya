const jwt = require("jsonwebtoken");
require("dotenv").config();

// ✅ Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Ensure authorization header is present
    if (!authHeader) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Required" });
    }

    // Extract token from authorization header
    const token = authHeader.split(" ")[1]; // Expecting 'Bearer token'
    
    if (!token) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Required" });
    }

    try {
        // Verify the JWT token with the secret stored in the environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user info to the request object for later use
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, JWT Token is Invalid or Expired" });
    }
};

// ✅ Middleware to check if user is an instructor (teacher)
const isInstructor = (req, res, next) => {
    // Ensure user is authenticated and check role
    if (!req.user || req.user.role !== "teacher") {
        return res.status(403).json({ message: "Access Denied. Only instructors can perform this action." });
    }
    next(); // Continue to the next middleware or controller
};

module.exports = { isAuthenticated, isInstructor };
