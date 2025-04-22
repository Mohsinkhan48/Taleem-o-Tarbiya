const { User, Role } = require("../models");
const userService = require("./user.service");

const UserService = {
  register: async (user) => {
    const payload = {
      fullName: user.fullName,
      email: user.email,
      password: user.password,
      role: user.role
    };
    const newUser = new User(payload);
    return await newUser.save();
  },

  login: async (credentials) => {
    const { email, password } = credentials;
    const user = await userService.getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) return false;
    return user;
  },
  getRoles: async () => {
    return await Role.find();
  }
};

module.exports = UserService;
