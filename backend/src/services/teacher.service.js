const Stripe = require("stripe");
const { STRIPE_SECRET_KEY, FRONTEND_URL } = require("../config/env.config");
const { User } = require("../models");
const stripe = new Stripe(STRIPE_SECRET_KEY);

const teacherService = {
  createStandardAccount: async (userId) => {
    const user = await User.findById(userId).populate("role"); // ✅ Await here

    if (!user) throw new Error("User not found");

    if (user.stripeAccountId) return user.stripeAccountId;

    const account = await stripe.accounts.create({
      type: "standard",
      email: user.email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    user.stripeAccountId = account.id;
    await user.save(); // ✅ Will work now

    return account.id;
  },

  generateOnboardingLink: async (stripeAccountId) => {
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${FRONTEND_URL}teacher/stripe/reauth`,
      return_url: `${FRONTEND_URL}teacher/stripe/connected`,
      type: "account_onboarding",
    });

    return accountLink.url;
  },
  getAccountStatus: async (userId) => {
    const user = await User.findById(userId);
    if (!user || !user.stripeAccountId) {
      return { status: "not_connected", reason: "No Stripe account linked." };
    }

    const account = await stripe.accounts.retrieve(user.stripeAccountId);

    if (
      account.details_submitted &&
      account.charges_enabled &&
      account.payouts_enabled
    ) {
      return { status: "complete" };
    }

    if (!account.details_submitted) {
      return { status: "pending", reason: "Details not submitted" };
    }

    if (
      account.requirements.disabled_reason ||
      account.requirements.currently_due.length > 0
    ) {
      return {
        status: "restricted",
        reason:
          account.requirements.disabled_reason ||
          "Missing required information",
      };
    }

    return {
      status: "pending",
      reason: "Stripe is reviewing your information.",
    };
  },
};

module.exports = teacherService;
