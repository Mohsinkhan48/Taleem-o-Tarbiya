// components/Reusable/AddToCartButton.tsx
import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Reusable/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addToCart } from "../../redux/slices/CartSlice";

interface AddToCartButtonProps {
  courseId: string;
  className?: string;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ courseId, className }) => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();
  const { addLoading } = useSelector((state: RootState)=> state.cart)
  const isLoading = addLoading[courseId] || false;

  if (!user || user?.role?.name !== "student") return null;

  const handleAddToCart = async () => {
      await dispatch(addToCart(courseId)).unwrap()
  };

  return (
    <Button variant="secondary" className={className} onClick={handleAddToCart} isLoading={isLoading}>
      Add to Cart
    </Button>
  );
};

export default AddToCartButton;
