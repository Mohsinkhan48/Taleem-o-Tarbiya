import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CourseService } from "../../service/courseService"; // This service should handle your API requests
import { addToast } from "./toasterSlice";
import { Course } from "../../types/course.types";

// Define the Course state type
interface UpdateCourseState {
  course: Course | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Initial state
const initialState: UpdateCourseState = {
  course: null,
  loading: false,
  error: null,
  success: false,
};

// Async thunk for updating a course
export const updateCourse = createAsyncThunk<
  Course, // Return type
  object, // Argument type (the course data)
  { rejectValue: string }
>("update-course/update", async (courseData, { dispatch, rejectWithValue }) => {
  try {
    const response = await CourseService.updateCourse(courseData); // <-- Assuming you have updateCourse function

    if (response.data.success) {
      dispatch(
        addToast({
          message: "Course updated successfully!",
          type: "success",
          duration: 3000,
          position: "top-right",
        })
      );
      return response.data.course;
    } else {
      dispatch(
        addToast({
          message: response.data.errorMessage || "Failed to update course.",
          type: "error",
          duration: 3000,
          position: "top-right",
        })
      );
      return rejectWithValue(response.data.errorMessage || "Failed to update course.");
    }
  } catch (error: any) {
    const message = error.response?.data?.errorMessage || "Failed to update course.";
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

// Define the update course slice
const updateCourseSlice = createSlice({
  name: "update-course",
  initialState,
  reducers: {
    resetUpdateCourse: (state) => {
      state.course = null;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.course = action.payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.error = action.payload || "Course update failed";
        state.loading = false;
        state.success = false;
      });
  },
});

// Export actions
export const { resetUpdateCourse } = updateCourseSlice.actions;

// Export reducer
export default updateCourseSlice.reducer;
