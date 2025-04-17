import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import otpReducer from "./slices/otpEmailSlice";
import profileReducer from "./slices/profileSlice";
import toasterReducer from "./slices/toasterSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";
import resetPasswordReducer from "./slices/resetPasswordSlice";
import logoutReducer from "./slices/logoutSlice";
import courseReducer from "./slices/CourseSlice";
import createCourseReducer from "./slices/createCourseSlice";
import cartReducer from "./slices/CartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    profile: profileReducer,
    logout: logoutReducer,
    toaster: toasterReducer,
    course: courseReducer,
    createCourse: createCourseReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// TypeScript Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
