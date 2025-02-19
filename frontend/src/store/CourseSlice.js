import { createSlice } from '@reduxjs/toolkit';

const courseSlice = createSlice({
    name: 'course',
    initialState: { allCourses: [] },
    reducers: {
        setAllCourses: (state, action) => {
            state.allCourses = action.payload;
        },
    },
});

export const { setAllCourses } = courseSlice.actions;
export default courseSlice.reducer;
