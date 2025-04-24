import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addToast } from './toasterSlice';
import { CourseService } from '../../service/courseService';
import { Course } from '../../types/course.types';

// State interface
interface CourseState {
  loading: boolean;
  allCourses: Course[];
  error: string | null;
}

// Initial state
const initialState: CourseState = {
  loading: false,
  allCourses: [],
  error: null,
};

export const fetchAllCourses = createAsyncThunk<
  Course[],
  Record<string, string | undefined>,
  { rejectValue: string }
>('course/fetchAllCourses', async (filters, { rejectWithValue, dispatch }) => {
  try {
    const response = await CourseService.getAllCourses(filters || {});
    return response.data.courses;
  } catch (error: any) {
    dispatch(
      addToast({
        message: error.response?.data?.reason || 'Failed to fetch courses',
        type: 'error',
        duration: 3000,
        position: 'top-right',
      })
    );
    return rejectWithValue(error.message);
  }
});


// ✅ Fetch Instructor Courses
export const fetchInstructorCourses = createAsyncThunk<
  Course[], // return type
  void, // token as input
  { rejectValue: string }
>('course/fetchInstructorCourses', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await CourseService.getInstructorCourses();
    return response.data.courses;
  } catch (error: any) {
    dispatch(
      addToast({
        message: error.response?.data?.reason || 'Failed to fetch instructor courses',
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
      state.allCourses = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.allCourses = action.payload;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch courses';
      })
      .addCase(fetchInstructorCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.loading = false;
        state.allCourses = action.payload;
      })
      .addCase(fetchInstructorCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch instructor courses';
      });
  },
});

// Export actions
export const { resetCourseState } = courseSlice.actions;

// Export reducer
export default courseSlice.reducer;
