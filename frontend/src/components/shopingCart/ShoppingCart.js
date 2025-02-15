import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
    const cart = useSelector(state => Array.isArray(state.cart.courses) ? state.cart.courses : []);

    // Calculate total price with fallback for invalid prices
    const totalPrice = cart.reduce((total, course) => {
        const price = parseFloat(course.price);
        return total + (isNaN(price) ? 0 : price);
    }, 0);

    // Debugging: Log cart data to check for invalid prices
    console.log("Cart Data:", cart);

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-4xl bg-white shadow-lg p-6 rounded-lg">
                <h2 className="text-2xl font-bold border-b pb-3">Shopping Cart</h2>
                <p className="text-gray-600 mt-2">{cart.length} Course{cart.length !== 1 ? 's' : ''} in Cart</p>

                {cart.length === 0 ? (
                    <p className="text-gray-500 mt-6 text-center">Your cart is empty.</p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {cart.map(course => (
                            <CartItem key={course.id} course={course} />
                        ))}

                        {/* Total Price */}
                        <div className="flex justify-between items-center border-t pt-4">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                        </div>

                        {/* Proceed to Checkout */}
                        <Link
                            to="/checkout"
                            className="block bg-blue-600 text-white text-center py-3 mt-6 rounded-lg hover:bg-blue-700 transition-all duration-300"
                        >
                            Proceed to Checkout
                        </Link>

                        {/* Promotions Section */}
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold">Promotions</h3>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    placeholder="Enter Coupon"
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="mt-2 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all duration-300">
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;