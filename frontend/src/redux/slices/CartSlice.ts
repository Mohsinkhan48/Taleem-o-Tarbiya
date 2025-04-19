import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToast } from "./toasterSlice";
import { CartService } from "../../service/cartService";
import { Course } from "../../types/course.types";

export interface CartItem {
  course: Course; // Replace 'any' with actual course type if available
}

interface CartState {
  cart: CartItem[];
  loading: boolean;
  error: string | null;
  success: boolean;

  addLoading: Record<string, boolean>;
  removeLoading: Record<string, boolean>;
  clearLoading: boolean;
}

const initialState: CartState = {
  cart: [],
  loading: false,
  error: null,
  success: false,

  addLoading: {},
  removeLoading: {},
  clearLoading: false,
};

export const getCart = createAsyncThunk<
  CartItem[],
  void,
  { rejectValue: string }
>("cart/get", async (_, { dispatch, rejectWithValue }) => {
  try {
    const res = await CartService.getCart();
    return res.data.cart.items;
  } catch (err: any) {
    const msg = err.response?.data?.reason || "Failed to fetch cart.";
    dispatch(addToast({ message: msg, type: "error" }));
    return rejectWithValue(msg);
  }
});

export const addToCart = createAsyncThunk<any, string, { rejectValue: string }>(
  "cart/add",
  async (courseId, { dispatch, rejectWithValue }) => {
    try {
      const res = await CartService.addToCart({ courseId });
      dispatch(getCart());
      dispatch(addToast({ message: "Added to cart", type: "success" }));
      return res.data;
    } catch (err: any) {
      const msg = err.response?.data?.message || "Add to cart failed.";
      dispatch(addToast({ message: msg, type: "error" }));
      return rejectWithValue(msg);
    }
  }
);

export const removeFromCart = createAsyncThunk<
  string, // 👈 return type is now the courseId
  string,
  { rejectValue: string }
>("cart/remove", async (courseId, { dispatch, rejectWithValue }) => {
  try {
    await CartService.removeFromCart({ courseId });
    dispatch(addToast({ message: "Removed from cart", type: "success" }));
    return courseId; // 👈 return the courseId
  } catch (err: any) {
    const msg = err.response?.data?.message || "Remove from cart failed.";
    dispatch(addToast({ message: msg, type: "error" }));
    return rejectWithValue(msg);
  }
});

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

export const selectCartCount = (state: any) => state.cart.cart.length;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Cart
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
        state.error = action.payload || "Cart fetch failed.";
        state.loading = false;
      });

    // Add to Cart
    builder
      .addCase(addToCart.pending, (state, action) => {
        const courseId = action.meta.arg;
        state.addLoading[courseId] = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.addLoading[courseId] = false;
        state.success = true;
      })
      .addCase(addToCart.rejected, (state, action) => {
        const courseId = action.meta.arg;
        state.addLoading[courseId] = false;
        state.error = action.payload || "Add to cart failed.";
      });

    // Remove from Cart
    builder
      .addCase(removeFromCart.pending, (state, action) => {
        const courseId = action.meta.arg;
        state.removeLoading[courseId] = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        const courseId = action.meta.arg;
        state.removeLoading[courseId] = false;
        state.cart = state.cart.filter((item) => item.course._id !== courseId);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        const courseId = action.meta.arg;
        state.removeLoading[courseId] = false;
        state.error = action.payload || "Remove from cart failed.";
      });

    // Clear Cart
    builder
      .addCase(clearCart.pending, (state) => {
        state.clearLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.clearLoading = false;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.clearLoading = false;
        state.error = action.payload || "Clear cart failed.";
      });
  },
});

export default cartSlice.reducer;
