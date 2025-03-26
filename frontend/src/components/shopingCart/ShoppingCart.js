import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
    // Ensure `cart` is an array
    const cart = useSelector(state => 
        Array.isArray(state.cart.courses) ? state.cart.courses.filter(course => course && course._id && course.price) : []
    );

    // Debugging: Log cart contents
    console.log("Filtered Cart Data:", cart);

    // Calculate total price (ensuring valid numbers)
    const totalPrice = cart.reduce((total, course) => {
        const price = parseFloat(course.price);
        return total + (isNaN(price) ? 0 : price);
    }, 0);

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
                            <CartItem key={course._id} course={course} />
                        ))}

                        {/* Total Price */}
                        <div className="flex justify-between items-center border-t pt-4">
                            <span className="text-lg font-semibold">Total:</span>
                            <span className="text-xl font-bold">Rs:{totalPrice.toFixed(2)}</span>
                        </div>

                        {/* Proceed to Checkout */}
                        <Link
                            to="/checkout"
                            className="block bg-primaryColor text-white text-center py-3 mt-6 rounded-lg hover:bg-primaryColor/80 transition-all duration-300"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
