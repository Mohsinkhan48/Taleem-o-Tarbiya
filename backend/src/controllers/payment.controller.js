const { R2XX, R4XX } = require("../Responses");
const { paymentService } = require("../services");
const { getUserById } = require("../services/user.service");
const { catchAsync } = require("../utils");

const paymentController = {
  createCheckoutSession: catchAsync(async (req, res) => {
    const user = await getUserById(req.user)
    const session = await paymentService.createCheckoutSession(req.body, user);

    if (!session?.url) {
      return R4XX(res, 400, "Unable to create checkout session");
    }

    R2XX(res, "Checkout session created", 200, { url: session.url, sessionId: session.id });
  }),
};

module.exports = paymentController;
