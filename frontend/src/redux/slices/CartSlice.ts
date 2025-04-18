import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToast } from "./toasterSlice";
import { CartService } from "../../service/cartService";

interface CartState {
  cart: any[]; // you can strongly type this later
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
  success: false,
};

export const getCart = createAsyncThunk<any[], void, { rejectValue: string }>(
  "cart/get",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await CartService.getCart();
      return res.data.result.cartItems;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to fetch cart.";
      dispatch(addToast({ message: msg, type: "error" }));
      return rejectWithValue(msg);
    }
  }
);

export const addToCart = createAsyncThunk<any, string, { rejectValue: string }>(
  "cart/add",
  async (courseId, { dispatch, rejectWithValue }) => {
    try {
      const res = await CartService.addToCart({courseId});
      dispatch(getCart()); // refetch cart
      dispatch(addToast({ message: "Added to cart", type: "success" }));
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Add to cart failed.";
      dispatch(addToast({ message: msg, type: "error" }));
      return rejectWithValue(msg);
    }
  }
);

export const removeFromCart = createAsyncThunk<any, string, { rejectValue: string }>(
  "cart/remove",
  async (courseId, { dispatch, rejectWithValue }) => {
    try {
      const res = await CartService.removeFromCart({courseId});
      dispatch(getCart()); // refetch cart
      dispatch(addToast({ message: "Removed from cart", type: "success" }));
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Remove from cart failed.";
      dispatch(addToast({ message: msg, type: "error" }));
      return rejectWithValue(msg);
    }
  }
);

export const clearCart = createAsyncThunk<any, void, { rejectValue: string }>(
  "cart/clear",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await CartService.clearCart();
      dispatch(getCart());
      dispatch(addToast({ message: "Cart cleared", type: "success" }));
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Clear cart failed.";
      dispatch(addToast({ message: msg, type: "error" }));
      return rejectWithValue(msg);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.error = action.payload || "Cart fetch failed";
        state.loading = false;
      });
  },
});

export default cartSlice.reducer;
