import { configureStore, createSlice } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'; // Use local storage for persistence
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
    key: 'cart',
    storage,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: { courses: [] },
    reducers: {
        addCourse: (state, action) => {
            state.courses.push(action.payload);
        },
        removeCourse: (state, action) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
        clearCart: (state) => {
            state.courses = []; // Clear the cart on logout
        }
    }
});

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

const store = configureStore({
    reducer: {
        cart: persistedReducer
    }
});

const persistor = persistStore(store);

export { store, persistor };
export const { addCourse, removeCourse, clearCart } = cartSlice.actions;
