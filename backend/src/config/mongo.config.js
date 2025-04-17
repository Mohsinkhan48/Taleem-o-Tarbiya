const { MONGO_URI } = require("./env.config");

const mongooseConfig = {
  url: MONGO_URI,
  options: {},
};

module.exports = mongooseConfig;
