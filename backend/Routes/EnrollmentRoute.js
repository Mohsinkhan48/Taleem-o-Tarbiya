const express = require("express");
const router = express.Router();
const enrollmentController = require("../Controllers/EnrollmentController");
const { isAuthenticated } = require("../Middlewares/CourseMiddleware");

// ✅ Public Routes (Enroll in a course)
router.post("/enroll", isAuthenticated, enrollmentController.enrollInCourse);

// ✅ Payment Success and Cancel Routes (handled by Stripe after payment)
router.get("/payment/success", enrollmentController.paymentSuccess);
router.get("/payment/cancel", enrollmentController.paymentCancel);

// ✅ Update payment status manually (for admin or instructor)
router.put("/update-payment-status", isAuthenticated, enrollmentController.updatePaymentStatus);

module.exports = router;
