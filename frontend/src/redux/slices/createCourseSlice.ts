import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CourseService } from "../../service/courseService"; // This service should handle your API requests
import { addToast } from "./toasterSlice"; // Optional, to show success/error toast notifications
import { Course } from "../../types/course.types";

// Define the Course state type
interface CourseState {
  course: Course | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Initial state
const initialState: CourseState = {
  course: null,
  loading: false,
  error: null,
  success: false,
};

// Async thunk for creating a course
export const createCourse = createAsyncThunk<
  Course, // Return type
  object, // Argument type (the course data)
  { rejectValue: string }
>("create-course/create", async (courseData, { dispatch, rejectWithValue }) => {
  try {
    const response = await CourseService.createCourse(courseData);

    if (response.data.success) {
      dispatch(
        addToast({
          message: "Course created successfully!",
          type: "success",
          duration: 3000,
          position: "top-right",
        })
      );
      return response.data.course;
    } else {
      dispatch(
        addToast({
          message: response.data.errorMessage || "Failed to create course.",
          type: "error",
          duration: 3000,
          position: "top-right",
        })
      );
      return rejectWithValue(response.data.errorMessage || "Failed to create course.");
    }
  } catch (error: any) {
    const message = error.response?.data?.errorMessage || "Failed to create course.";
    dispatch(
      addToast({
        message,
        type: "error",
        duration: 3000,
        position: "top-right",
      })
    );
    return rejectWithValue(message);
  }
});


// Define the course slice
const createCourseSlice = createSlice({
  name: "create-course",
  initialState,
  reducers: {
    // If needed, define actions here to update local state
    resetCourse: (state) => {
      state.course = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.course = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.error = action.payload || "Course creation failed";
        state.loading = false;
        state.success = false;
      });
  },
});

// Export actions
export const { resetCourse } = createCourseSlice.actions;

// Export reducer
export default createCourseSlice.reducer;
