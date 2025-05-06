import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import otpReducer from "./slices/otpEmailSlice";
import profileReducer from "./slices/profileSlice";
import toasterReducer from "./slices/toasterSlice";
import forgotPasswordReducer from "./slices/forgotPasswordSlice";
import resetPasswordReducer from "./slices/resetPasswordSlice";
import getCoursesReducer from "./slices/getCoursesSlice";
import getCourseByIdReducer from "./slices/getCourseByIdSlice";
import getInstructorCourseByIdReducer from "./slices/getInstructorCourseByIdSlice";
import getStudentEnrolledCourseReducer from "./slices/getStudentEnrolledCourseSlice";
import createCourseReducer from "./slices/createCourseSlice";
import updateCourseReducer from "./slices/updateCourseSlice";
import addChapterReducer from "./slices/addChapterSlice";
import cartReducer from "./slices/CartSlice";
import selectedChapterReducer from "./slices/selectedChapter";
import uploadThumbnailReducer from "./slices/uploadThumbnailSlice";

import {
  courseCategoryReducer,
  courseTagReducer,
  courseLevelReducer,
  roleReducer,
  studentCoursesReducer
} from "./slices/fetch/fetchSlices";

const store = configureStore({
  reducer: {
    auth: authReducer,
    otp: otpReducer,
    forgotPassword: forgotPasswordReducer,
    resetPassword: resetPasswordReducer,
    profile: profileReducer,
    toaster: toasterReducer,
    courses: getCoursesReducer,
    course: getCourseByIdReducer,
    instructorCourse: getInstructorCourseByIdReducer,
    studentCourse: getStudentEnrolledCourseReducer,
    createCourse: createCourseReducer,
    updateCourse: updateCourseReducer,
    addChapter: addChapterReducer,
    cart: cartReducer,
    selectedChapter: selectedChapterReducer,
    uploadThumbnail: uploadThumbnailReducer,
    
    // ✅ New meta reducers
    courseCategories: courseCategoryReducer,
    courseTags: courseTagReducer,
    courseLevels: courseLevelReducer,
    role: roleReducer,
    studentCourses: studentCoursesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// TypeScript Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
