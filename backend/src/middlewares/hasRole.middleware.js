const { R4XX } = require("../Responses");
const { userService } = require("../services");
const { catchAsync } = require("../utils");

const hasRole = (allowedRoles) => {
  return catchAsync(async (req, res, next) => {
    const user_id = req.user;
    const user = await userService.getUserById(user_id);
    if (!user) {
      return R4XX(res, 401, "User not found");
    }
    if (!allowedRoles.includes(user.role.name)) {
      return R4XX(res, 401, `Access denied: You are not authorized`);
    }
    next();
  });
};

module.exports = hasRole;
