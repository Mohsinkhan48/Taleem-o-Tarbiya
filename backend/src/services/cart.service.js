const { Cart } = require("../models");

const cartService = {
  // Get cart by user ID
  getCart: async (userId) => {
    return await Cart.findOne({ user: userId }).populate("items.course");
  },

  // Add a course to cart
  addToCart: async (userId, courseId) => {
    let cart = await Cart .findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const alreadyInCart = cart.items.some(
      (item) => item.course.toString() === courseId
    );

    if (alreadyInCart) return cart; // No duplicate entries

    cart.items.push({ course: courseId });
    await cart.save();

    return await cart.populate("items.course");
  },

  // Remove a course from cart
  removeFromCart: async (userId, courseId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return false;

    cart.items = cart.items.filter(
      (item) => item.course.toString() !== courseId
    );

    await cart.save();
    return await cart.populate("items.course");
  },

  // Clear all items from cart
  clearCart: async (userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return false;

    cart.items = [];
    await cart.save();
    return true;
  },
};

module.exports = cartService;
