import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import Button from "../../Reusable/Button";
import { SERVER_URL, STRIPE_PUBLISHABLE_KEY } from "../../../constants/env.constants";
import apiClient from "../../../api/apiClient";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface CheckoutButtonProps {
  courseId: string;
  isLoading?: boolean;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({ courseId, isLoading = false }) => {
  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe failed to load");

      const response = await apiClient.post(
        `${SERVER_URL}payment/create-checkout-session`,
        { courseId } // Send just one courseId
      );

      const { sessionId } = response.data;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Button onClick={handleCheckout} variant="success" isLoading={isLoading}>
      Buy Now
    </Button>
  );
};

export default CheckoutButton;
