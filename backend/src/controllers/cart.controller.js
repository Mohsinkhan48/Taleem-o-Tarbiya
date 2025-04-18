const { R2XX, R4XX } = require("../Responses");
const { cartService } = require("../services");
const { catchAsync } = require("../utils");

const cartController = {
  // Add course to cart
  addToCart: catchAsync(async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user;

    const updatedCart = await cartService.addToCart(userId, courseId);

    if (!updatedCart) return R4XX(res, 400, "Failed to add course to cart");

    R2XX(res, "Course added to cart successfully", 200, { cart: updatedCart });
  }),

  // Get all items in cart
  getCart: catchAsync(async (req, res) => {
    const userId = req.user;

    const cart = await cartService.getCart(userId);
    if (!cart || cart.items.length === 0)
      return R4XX(res, 404, "Cart is empty");

    R2XX(res, "Fetched cart successfully", 200, { cart });
  }),

  // Remove course from cart
  removeFromCart: catchAsync(async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user;

    const updatedCart = await cartService.removeFromCart(userId, courseId);

    if (!updatedCart) return R4XX(res, 400, "Failed to remove course from cart");

    R2XX(res, "Course removed from cart successfully", 200, { cart: updatedCart });
  }),

  // Clear all items in cart
  clearCart: catchAsync(async (req, res) => {
    const userId = req.user;

    const result = await cartService.clearCart(userId);
    if (!result) return R4XX(res, 400, "Failed to clear cart");

    R2XX(res, "Cart cleared successfully", 200, {});
  })
};

module.exports = cartController;
