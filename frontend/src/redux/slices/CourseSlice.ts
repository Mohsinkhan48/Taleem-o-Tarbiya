import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addToast } from './toasterSlice';
import { CourseService } from '../../service/courseService';

export interface Course {
  _id: string;
  image: string;
  title: string;
  description: string;
  content: string;
  duration: string;
  price: number;
  level: string;
  instructor: string | null; // can be replaced with an object if populated
  modules: string[]; // Array of module IDs
  ratings: any[]; // Update if you have a specific type for ratings
  category: string;
  isPaid: boolean;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
}

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

// ✅ Fetch All Courses
export const fetchAllCourses = createAsyncThunk<
  Course[], // return type
  void, // argument type
  { rejectValue: string }
>('course/fetchAllCourses', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await CourseService.getAllCourses();
    dispatch(
      addToast({
        message: 'Courses loaded successfully!',
        type: 'success',
        duration: 3000,
        position: 'top-right',
      })
    );
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
    dispatch(
      addToast({
        message: 'Instructor courses loaded!',
        type: 'success',
        duration: 3000,
        position: 'top-right',
      })
    );
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
