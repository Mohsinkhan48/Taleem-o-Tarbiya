import { createSlice } from "@reduxjs/toolkit";
import { Chapter } from "../../types/course.types";

const initialState : {selectedChapter: Chapter | null} = {
  selectedChapter: null,
};

const selectedChapterSlice = createSlice({
  name: "selectedChapter",
  initialState,
  reducers: {
    setSelectedChapter: (state, action) => {
      state.selectedChapter = action.payload;
    },
    clearSelectedChapter: (state) => {
      state.selectedChapter = null;
    },
  },
});

export const { setSelectedChapter, clearSelectedChapter } =
  selectedChapterSlice.actions;
export default selectedChapterSlice.reducer;
