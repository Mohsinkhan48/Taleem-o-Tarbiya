import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Course } from './CourseSlice';

// Define the Cart State type
interface CartState {
  courses: Course[];
}

// Load cart data from localStorage
const loadCartFromStorage = (): Course[] => {
  const savedCart = localStorage.getItem('cart');
  return savedCart ? JSON.parse(savedCart) : [];
};

// Initial State
const initialState: CartState = {
  courses: loadCartFromStorage(),
};

// Create Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCourse: (state, action: PayloadAction<Course>) => {
      const course = action.payload;
      const exists = state.courses.find(c => c._id === course._id);
      if (!exists) {
        state.courses.push(course);
        localStorage.setItem('cart', JSON.stringify(state.courses));
      }
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter(c => c._id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.courses));
    },
    clearCart: (state) => {
      state.courses = [];
      localStorage.removeItem('cart');
    },
  },
});

// Export Actions & Reducer
export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
