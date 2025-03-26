import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/CartSlice';
import courseReducer from '../features/CourseSlice';



const store = configureStore({
    reducer: {
        cart: cartReducer,
        course: courseReducer, 
    }
});
export default store;
