import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CourseService } from "../../service/courseService";
import { addToast } from "./toasterSlice";

interface ThumbnailState {
  loading: boolean;
  error: string | null;
  success: boolean;
  imageUrl: string | null;
}

const initialState: ThumbnailState = {
  loading: false,
  error: null,
  success: false,
  imageUrl: null,
};

// Async thunk
export const uploadThumbnail = createAsyncThunk<
  string, // image URL
  { courseId: string; file: File }, // input
  { rejectValue: string }
>("upload-thumbnail/upload", async ({ courseId, file }, { dispatch, rejectWithValue }) => {
  try {
    const response = await CourseService.uploadCourseThumbnail(courseId, file);

    if (response.data.success) {
      dispatch(
        addToast({
          message: "Thumbnail uploaded successfully!",
          type: "success",
          duration: 3000,
          position: "top-right",
        })
      );
      return response.data.imageUrl;
    } else {
      dispatch(
        addToast({
          message: response.data.reason || "Failed to upload thumbnail.",
          type: "error",
          duration: 3000,
          position: "top-right",
        })
      );
      return rejectWithValue(response.data.reason || "Failed to upload thumbnail.");
    }
  } catch (error: any) {
    const message = error.response?.data?.reason || "Thumbnail upload failed.";
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

// Slice
const uploadThumbnailSlice = createSlice({
  name: "upload-thumbnail",
  initialState,
  reducers: {
    resetThumbnailUpload: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.imageUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadThumbnail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadThumbnail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.imageUrl = action.payload;
      })
      .addCase(uploadThumbnail.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Thumbnail upload failed";
      });
  },
});

export const { resetThumbnailUpload } = uploadThumbnailSlice.actions;

export default uploadThumbnailSlice.reducer;
