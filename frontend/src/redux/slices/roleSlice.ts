import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { addToast } from "./toasterSlice";
import { UserService } from "../../service/userService";
import { Role } from "../../types/auth.types";

// State interface
interface RoleState {
  loading: boolean;
  allRoles: Role[];
  error: string | null;
}

// Initial state
const initialState: RoleState = {
  loading: false,
  allRoles: [],
  error: null,
};

// ✅ Fetch All Roles
export const fetchAllRoles = createAsyncThunk<
  Role[], // return type
  void, // argument
  { rejectValue: string }
>("role/fetchAllRoles", async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await UserService.getRoles();
    dispatch(
      addToast({
        message: "Roles loaded successfully!",
        type: "success",
        duration: 3000,
        position: "top-right",
      })
    );
    return response.data.roles;
  } catch (error: any) {
    dispatch(
      addToast({
        message: error.response?.data?.reason || "Failed to fetch roles",
        type: "error",
        duration: 3000,
        position: "top-right",
      })
    );
    return rejectWithValue(error.message);
  }
});

// Slice
const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    resetRoleState: (state) => {
      state.allRoles = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllRoles.fulfilled,
        (state, action: PayloadAction<Role[]>) => {
          state.loading = false;
          state.allRoles = action.payload;
        }
      )
      .addCase(fetchAllRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch roles";
      });
  },
});

// Export actions
export const { resetRoleState } = roleSlice.actions;

// Export reducer
export default roleSlice.reducer;
