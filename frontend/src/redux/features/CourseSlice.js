import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAllCourses = createAsyncThunk(
    'course/fetchAllCourses',
    async () => {
        const response = await fetch('http://localhost:8080/api/courses');
        return await response.json();
    }
);

const courseSlice = createSlice({
    name: 'course',
    initialState: { 
        loading: false,
        allCourses: [],
        error: '',

     },
     extraReducers:(builder)=>{
            builder.addCase(fetchAllCourses.pending, (state, action) => {
                state.loading = true;
            });
            builder.addCase(fetchAllCourses.fulfilled, (state, action) => {
                state.loading = false;
                state.allCourses = action.payload.courses;
            });
            builder.addCase(fetchAllCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
     }
});

export default courseSlice.reducer;
