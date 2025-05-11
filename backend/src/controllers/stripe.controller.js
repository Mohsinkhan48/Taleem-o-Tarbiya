const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { Order } = require("../models");
const { enrollmentService, cartService } = require("../services");
const { STRIPE_WEBHOOK_SECRET_KEY } = require("../config/env.config");
const { catchAsync } = require("../utils");
const { R2XX } = require("../Responses");

const stripeController = {
  webhookHandler: catchAsync(async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET_KEY);
    } catch (err) {
      console.error("⚠️ Stripe webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const courseId = session.metadata.courseId;

      // Mark order as paid
      const order = await Order.findOneAndUpdate(
        { stripeSessionId: session.id },
        {
          status: "paid",
          paymentIntentId: session.payment_intent,
        },
        { new: true }
      );

      // Enroll user in the course
      await cartService.removeFromCart(userId, courseId);
      await enrollmentService.enrollStudent(courseId, userId);

      console.log("✅ Order marked as paid and user enrolled in course:", courseId);
    }

    R2XX(res, "✅ Webhook processed", 200, { received: true });
  }),
};

module.exports = stripeController;
