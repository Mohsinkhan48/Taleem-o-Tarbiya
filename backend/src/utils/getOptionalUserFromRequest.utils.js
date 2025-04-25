const { jwtUtils } = require(".");
const { getUserById } = require("../services/user.service");

const getOptionalUserFromRequest = async (req) => {
  try {
    const jwt = req.headers.authorization;
    if (!jwt) return null;

    const decoded = await jwtUtils.verifyToken(jwt);
    if (!decoded?.sub) return null;

    const user = await getUserById(decoded.sub);
    return user || null;
  } catch (error) {
    return null; // if token is invalid, just treat as unauthenticated
  }
};

module.exports = getOptionalUserFromRequest;
