const { User } = require("../models");

const UserService = {
  getUserByEmail: async (email) => {
    return await User.findOne({ email }).populate('role');
  },
  getUserById: async (id) => {
    return await User.findById(id).populate('role');
  },
  updateUserById: async function (id, updateBody) {
    const user = await this.getUserById(id);
    if (!user) return false;
    Object.assign(user, updateBody);
    await user.save();
    return user;
  },
};

module.exports = UserService;
