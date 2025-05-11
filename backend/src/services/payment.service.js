const Stripe = require("stripe");
const { Course, Order, User } = require("../models");
const { STRIPE_SECRET_KEY, FRONTEND_URL } = require("../config/env.config");
const stripe = new Stripe(STRIPE_SECRET_KEY);

const paymentService = {
  createCheckoutSession: async (body, user) => {
    const { courseId } = body;

    const course = await Course.findById(courseId).populate("instructor");
    if (!course) throw new Error("Course not found");

    const instructor = course.instructor;

    if (!instructor || !instructor.stripeAccountId) {
      throw new Error("Instructor has no connected Stripe account");
    }

    const stripeAccount = await stripe.accounts.retrieve(instructor.stripeAccountId);

    if (
      stripeAccount.charges_enabled !== true ||
      stripeAccount.details_submitted !== true
    ) {
      throw new Error("Instructor's Stripe account is not fully onboarded");
    }

    const priceInCents = course.price * 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: course.title,
              description: course.description,
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user._id.toString(),
        courseId: courseId,
      },
      success_url: `${FRONTEND_URL}student/payment/success`,
      cancel_url: `${FRONTEND_URL}student/payment/cancel`,

      // Split logic here
      payment_intent_data: {
        application_fee_amount: Math.round(priceInCents * 0.3), // 30% fee
        transfer_data: {
          destination: instructor.stripeAccountId, // 70% goes to instructor
        },
      },
    });

    // Save order
    await Order.create({
      user: user._id,
      course: courseId,
      stripeSessionId: session.id,
      status: "pending",
      totalAmount: course.price,
    });

    return session;
  },
};

module.exports = paymentService;
