import { createSlice } from "@reduxjs/toolkit";

// Load cart data from localStorage
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : []; // Default to empty array if no data
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { courses: loadCartFromStorage() },  // Load cart from localStorage
  reducers: {
    addCourse: (state, action) => {
      const course = action.payload;
      const existingCourse = state.courses.find(c => c._id === course._id);
      if (!existingCourse) {
        state.courses.push(course);
        localStorage.setItem("cart", JSON.stringify(state.courses)); // Save updated cart
      }
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(course => course._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.courses)); // Save updated cart
    },
    clearCart: (state) => {
      state.courses = [];
      localStorage.removeItem("cart"); // Clear cart from localStorage
    }
  }
});

export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
