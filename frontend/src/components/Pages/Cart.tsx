import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, removeFromCart } from "../../redux/slices/CartSlice";

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, loading } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleRemove = (courseId: string) => {
    dispatch(removeFromCart(courseId));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item: any) => (
              <li key={item.course._id} className="border p-4 rounded shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{item.course.title}</h3>
                  <p className="text-sm text-gray-600">{item.course.description}</p>
                </div>
                <button
                  onClick={() => handleRemove(item.course._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClear}
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
