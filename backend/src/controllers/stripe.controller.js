const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { Order } = require("../models");
const { enrollmentService, cartService } = require("../services");
const { STRIPE_WEBHOOK_SECRET_KEY } = require("../config/env.config");

const stripeController = {
  webhookHandler: async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        STRIPE_WEBHOOK_SECRET_KEY
      );
    } catch (err) {
      console.log("⚠️ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const courseIds = session.metadata.courseIds.split(",");

      try {
        // Mark order as paid
        const order = await Order.findOneAndUpdate(
          { stripeSessionId: session.id },
          {
            status: "paid",
            paymentIntentId: session.payment_intent,
          },
          { new: true }
        );

        // Enroll user in courses
        for (const courseId of courseIds) {
          await cartService.removeFromCart(userId, courseId);
          await enrollmentService.enrollStudent(courseId, userId);
        }

        console.log("✅ Order updated & user enrolled");
      } catch (error) {
        console.error("❌ Webhook processing failed:", error);
      }
    }

    res.status(200).json({ received: true });
  },
};

module.exports = stripeController;
