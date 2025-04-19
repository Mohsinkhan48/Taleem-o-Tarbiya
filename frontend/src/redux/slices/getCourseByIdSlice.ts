import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'; 
import { addToast } from './toasterSlice';
import { CourseService } from '../../service/courseService';
import { Course } from '../../types/course.types';

// State interface
interface CourseState {
  loading: boolean;
  singleCourse: Course | null;
  error: string | null;
}

// Initial state
const initialState: CourseState = {
  loading: false,
  singleCourse: null,
  error: null,
};

// ✅ Fetch Course by ID
export const fetchCourseById = createAsyncThunk<
  Course, // return type
  string, // courseId as argument
  { rejectValue: string }
>('course/fetchCourseById', async (courseId, { rejectWithValue, dispatch }) => {
  try {
    const response = await CourseService.getCourseById(courseId);
    dispatch(
      addToast({
        message: 'Course loaded successfully!',
        type: 'success',
        duration: 3000,
        position: 'top-right',
      })
    );
    return response.data.course;
  } catch (error: any) {
    dispatch(
      addToast({
        message: error.response?.data?.reason || 'Failed to fetch course',
        type: 'error',
        duration: 3000,
        position: 'top-right',
      })
    );
    return rejectWithValue(error.message);
  }
});

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    resetCourseState: (state) => {
      state.singleCourse = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.singleCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch course';
      });
  },
});

// Export actions
export const { resetCourseState } = courseSlice.actions;

// Export reducer
export default courseSlice.reducer;
