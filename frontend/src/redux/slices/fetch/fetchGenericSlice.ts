import { createSlice, createAsyncThunk, PayloadAction, Draft } from "@reduxjs/toolkit";
import { fetchGenericService } from "../../../service/fetchGenericService";

export interface GenericState<T> {
    loading: boolean;
    data: T[];
    error: string | null;
  }  

// Generic thunk factory
export function createGenericThunk<T>(name: string, endpoint: string) {
  return createAsyncThunk<T[], void, { rejectValue: string }>(
    `${name}/fetchAll`,
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetchGenericService.fetchAll(endpoint);
        return response.data.data;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
}

// Generic slice factory
export function createGenericSlice<T>(name: string, thunk: ReturnType<typeof createGenericThunk<T>>) {
  const initialState: GenericState<T> = {
    loading: false,
    data: [],
    error: null,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      resetState: (state) => {
        state.data = [];
        state.loading = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(thunk.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(thunk.fulfilled, (state, action: PayloadAction<T[]>) => {
          state.loading = false;
          state.data = action.payload as Draft<T[]>;
        })
        .addCase(thunk.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || "Something went wrong.";
        });
    },
  });

  return {
    reducer: slice.reducer,
    actions: slice.actions,
  };
}
