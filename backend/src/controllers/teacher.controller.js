const { teacherService } = require("../services");
const { catchAsync } = require("../utils");
const { R2XX, R4XX } = require("../Responses");

const teacherController = {
  onboardTeacher: catchAsync(async (req, res) => {
    const user = req.user;
    const accountId = await teacherService.createStandardAccount(user);
    const onboardingUrl = await teacherService.generateOnboardingLink(
      accountId
    );
    console.log(onboardingUrl);
    R2XX(res, "Teacher Onboarded Successfully!", 200, { url: onboardingUrl });
  }),
  getStripeAccountStatus: catchAsync(async (req, res) => {
    const user = req.user;
    const status = await teacherService.getAccountStatus(user);
    R2XX(res, "Stripe account status fetched", 200, status);
  }),
};

module.exports = teacherController;
