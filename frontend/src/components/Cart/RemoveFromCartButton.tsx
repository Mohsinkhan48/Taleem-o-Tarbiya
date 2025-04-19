import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { removeFromCart } from "../../redux/slices/CartSlice";

interface RemoveFromCartButtonProps {
  courseId: string;
  className?: string;
}

const RemoveFromCartButton: React.FC<RemoveFromCartButtonProps> = ({ courseId, className }) => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { removeLoading } = useSelector((state: RootState) => state.cart);
  const isLoading = removeLoading[courseId] || false;

  if (!user || user?.role?.name !== "student") return null;

  const handleRemoveFromCart = async () => {
    await dispatch(removeFromCart(courseId)).unwrap();
  };

  return (
    <Button variant="danger" className={className} onClick={handleRemoveFromCart} isLoading={isLoading}>
      Remove from Cart
    </Button>
  );
};

export default RemoveFromCartButton;
