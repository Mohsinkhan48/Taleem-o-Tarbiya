import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { getCart, selectCartCount } from "../../../redux/slices/CartSlice";
import { AppDispatch } from "../../../redux/store";
import { useEffect } from "react";

const CartButton = () => {
  const cartCount = useSelector(selectCartCount);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
      dispatch(getCart());
  }, [dispatch]);
  return (
    <Link to="/student/cart" className="relative flex items-center justify-center">
      <FiShoppingCart className="text-2xl text-text hover:text-link transition-colors" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {cartCount}
        </span>
      )}
    </Link>
  );
};

export default CartButton;
