const { teacherService } = require("../services");
const { catchAsync } = require("../utils");
const { R2XX, R4XX } = require("../Responses");
const { User } = require("../models");
const { userSanitizer } = require("../sanitizers/response.sanitizer");

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

  updateUniversity: catchAsync(async (req, res) => {
    const { teacherId, university } = req.body;
    const teacher = await User.findByIdAndUpdate(
      teacherId,
      { university },
      { new: true } // return updated document
    ).populate("role"); // populate role if it's a ref
    R2XX(res, "University updated successfully!", 200, {
      teacher: userSanitizer(teacher),
    });
  }),
};

module.exports = teacherController;
