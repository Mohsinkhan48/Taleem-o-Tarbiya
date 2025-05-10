const Stripe = require("stripe");
const { Course, Order } = require("../models");
const { STRIPE_SECRET_KEY } = require("../config/env.config");
const stripe = new Stripe(STRIPE_SECRET_KEY);

const paymentService = {
  createCheckoutSession: async (body, user) => {
    const { courseIds } = body;

    const courses = await Course.find({ _id: { $in: courseIds } });
    if (!courses.length) throw new Error("No valid courses found");

    let totalAmount = 0;
    const coursesPrices = courses.map((course) => {
      const coursePrice = course.price;
      totalAmount += coursePrice;
      return {
        courseId: course._id,
        price: course.price,
      };
    });

    const line_items = courses.map((course) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: course.title,
          description: course.description,
        },
        unit_amount: course.price * 100, // Price in cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: user.email,
      line_items,
      metadata: {
        userId: user._id.toString(),
        courseIds: courseIds.join(","),
      },
      success_url: `${process.env.FRONTEND_URL}student/payment/success`,
      cancel_url: `${process.env.FRONTEND_URL}student/payment/cancel`,
    });

    // Create a pending order entry in DB, including coursesPrices and totalAmount
    await Order.create({
      user: user._id,
      courses: courseIds,
      stripeSessionId: session.id,
      status: "pending",
      totalAmount,
      coursesPrices,
    });

    return session;
  },
};

module.exports = paymentService;
