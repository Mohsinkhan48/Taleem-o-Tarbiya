import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { CartItem, clearCart, getCart } from "../../redux/slices/CartSlice";
import { Loader } from "../../assets/Loader";
import RemoveFromCartButton from "../Cart/RemoveFromCartButton";
import Button from "../Reusable/Button";
import { useNavigate } from "react-router";
import CheckoutButton from "./Stripe/CheckoutButton";
import { BACKEND_URL } from "../../constants/env.constants";
import ImageContainer from "../Reusable/ImageContainer";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { cart, loading, clearLoading } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleClear = () => {
    dispatch(clearCart());
  };
  const totalPrice = cart.reduce((total, item) => total + item.course.price, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-text text-3xl font-bold mb-6 border-b border-card-border pb-2">
        Your Cart
      </h2>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader className="text-text" size={30} />
        </div>
      ) : cart.length === 0 ? (
        <p className="text-center text-secondary text-lg">
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul className="space-y-6">
            {cart.map((item: CartItem) => (
              <li
                key={item.course._id}
                className="border border-card-border bg-card rounded-lg p-4 flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <ImageContainer
                    src={`${BACKEND_URL}${item.course.image}`}
                    alt={item.course.title}
                    width="w-24"
                    height="h-24"
                  />
                  <div>
                    <h3
                      className="text-xl font-semibold text-text cursor-pointer hover:underline"
                      onClick={() => navigate(`/course/${item.course._id}`)}
                    >
                      {item.course.title}
                    </h3>
                    <p className="text-sm text-text">
                      {item.course.description}
                    </p>
                    <p className="text-sm mt-1 text-text">
                      <span className="mr-2">⏱ {item.course.duration}</span>
                    </p>
                    <p className="mt-2 text-secondary font-semibold">
                      Price: ${item.course.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex flex-col gap-2 items-end">
                  <CheckoutButton
                    courseId={item.course._id}
                    isLoading={loading}
                  />
                  <RemoveFromCartButton courseId={item.course._id} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t border-card-border pt-6">
            <div className="text-xl font-medium text-text">
              Total Price:{" "}
              <span className="text-success font-bold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <Button
              onClick={handleClear}
              variant="danger"
              isLoading={clearLoading}
            >
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
