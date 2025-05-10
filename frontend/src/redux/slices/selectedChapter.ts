import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chapter } from "../../types/course.types";

interface SelectedChapterState {
  courseId: string | null;
  moduleId: string | null;
  chapter: Chapter | null;
}

const initialState: SelectedChapterState = {
  courseId: null,
  moduleId: null,
  chapter: null,
};

const selectedChapterSlice = createSlice({
  name: "selectedChapter",
  initialState,
  reducers: {
    setSelectedChapter: (
      state,
      action: PayloadAction<SelectedChapterState>
    ) => {
      state.courseId = action.payload.courseId;
      state.moduleId = action.payload.moduleId;
      state.chapter = action.payload.chapter;
    },
    clearSelectedChapter: (state) => {
      state.courseId = null;
      state.moduleId = null;
      state.chapter = null;
    },
  },
});

export const { setSelectedChapter, clearSelectedChapter } =
  selectedChapterSlice.actions;
export default selectedChapterSlice.reducer;
