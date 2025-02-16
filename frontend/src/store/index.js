import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import courseReducer from './CourseSlice'; 

const persistConfig = {
    key: 'cart',
    storage,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: { courses: [] },
    reducers: {
        addCourse: (state, action) => {
            const { id, title, description, price, instructor, duration, level, image } = action.payload;
            const existingCourse = state.courses.find(course => course.id === id);
            if (!existingCourse) {
                state.courses.push({ id, title, description, price, instructor, duration, level, image });
            }
        },
        removeCourse: (state, action) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
        clearCart: (state) => {
            state.courses = [];
        }
    }
});

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
    reducer: {
        cart: persistedReducer,
        course: courseReducer, // Add course reducer
    }
});

const persistor = persistStore(store);

export { store, persistor };
export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
