const { Cart, Enrollment } = require("../models");

const cartService = {
  // Get cart by user ID
  getCart: async (userId) => {
    let cart = await Cart.findOne({ student: userId }).populate("items.course");
  
    // If no cart exists, create an empty one and return it
    if (!cart) {
      cart = new Cart({ student: userId, items: [] });
      await cart.save();
      cart = await cart.populate("items.course");
    }
  
    return cart;
  },

  // Add a course to cart
  addToCart: async (userId, courseId) => {
    const isEnrolled = await Enrollment.findOne({ student: userId, course: courseId });

    if (isEnrolled) {
      return null;
    }
    let cart = await Cart.findOne({ student: userId });

    if (!cart) {
      cart = new Cart({ student: userId, items: [] });
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
    const cart = await Cart.findOne({ student: userId });
    if (!cart) return false;

    cart.items = cart.items.filter(
      (item) => item.course.toString() !== courseId
    );

    await cart.save();
    return await cart.populate("items.course");
  },

  // Clear all items from cart
  clearCart: async (userId) => {
    const cart = await Cart.findOne({ student: userId });
    if (!cart) return false;

    cart.items = [];
    await cart.save();
    return true;
  },
};

module.exports = cartService;
