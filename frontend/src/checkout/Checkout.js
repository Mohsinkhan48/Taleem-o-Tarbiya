import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Checkout = () => {
    const cart = useSelector((state) => Array.isArray(state.cart.courses) ? state.cart.courses : []);
    const [paymentMethod, setPaymentMethod] = useState("card"); // Default payment method
    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: "",
        cvc: "",
        nameOnCard: "",
    });

    const totalPrice = cart.reduce((total, course) => {
        const price = parseFloat(course.price);
        return total + (isNaN(price) ? 0 : price);
    }, 0);

    // Handle payment method change
    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentMethod === "card") {
            console.log("Card Details:", cardDetails);
            alert("Payment Successful!");
        } else if (paymentMethod === "paypal") {
            console.log("Redirecting to PayPal...");
            alert("Redirecting to PayPal...");
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-6xl bg-white shadow-lg p-6 rounded-lg">
                <h1 className="text-3xl font-bold border-b pb-4">Checkout</h1>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Payment Method Column */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Payment Method</h2>

                        {/* Card Payment Form */}
                        {paymentMethod === "card" && (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Card Number</label>
                                    <input
                                        type="text"
                                        placeholder="1234 5678 9012 3456"
                                        value={cardDetails.cardNumber}
                                        onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                                        <input
                                            type="text"
                                            placeholder="MM/YY"
                                            value={cardDetails.expiryDate}
                                            onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">CVC/CVV</label>
                                        <input
                                            type="text"
                                            placeholder="123"
                                            value={cardDetails.cvc}
                                            onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        value={cardDetails.nameOnCard}
                                        onChange={(e) => setCardDetails({ ...cardDetails, nameOnCard: e.target.value })}
                                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>
                            </form>
                        )}

                        {/* Payment Method Selector */}
                        <div className="space-y-2">
                            <button
                                onClick={() => handlePaymentMethodChange("card")}
                                className={`w-full p-4 border rounded-lg text-left ${
                                    paymentMethod === "card" ? "bg-blue-50 border-blue-500" : "bg-white"
                                } hover:bg-gray-50 transition-all duration-300`}
                            >
                                <span className="font-semibold">Credit/Debit Card</span>
                                <p className="text-sm text-gray-600">Pay with Visa, MasterCard, or other cards.</p>
                            </button>

                            <button
                                onClick={() => handlePaymentMethodChange("paypal")}
                                className={`w-full p-4 border rounded-lg text-left ${
                                    paymentMethod === "paypal" ? "bg-blue-50 border-blue-500" : "bg-white"
                                } hover:bg-gray-50 transition-all duration-300`}
                            >
                                <span className="font-semibold">PayPal</span>
                                <p className="text-sm text-gray-600">Pay securely with your PayPal account.</p>
                            </button>
                        </div>
                    </div>

                    {/* Order Summary Column */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Order Summary</h2>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Original Price:</span>
                                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between mt-2">
                                <span className="text-gray-600">Total:</span>
                                <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300"
                        >
                            Pay Now
                        </button>

                        {/* Money-Back Guarantee */}
                        <div className="text-center text-sm text-gray-600">
                            <p>30-Day Money-Back Guarantee</p>
                            <p>Secure Payment · Cancel Anytime</p>
                        </div>

                        {/* Additional Information */}
                        <div className="text-sm text-gray-600">
                            <p>By completing your purchase, you agree to our <Link to="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;