import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { googleLoginAction } from "@/store/actions/auth.action";
import { Client, Account } from "appwrite";
import { persistor } from "@/store";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_PROJECT_ID);
const account = new Account(client);

const initialState = { user: null, token: null, isLoading: false, error: null };

// logout async thunk
export const logoutAction = createAsyncThunk("auth/logout", async () => {
  try {
    await account.deleteSession("current");
  } catch (error: any) {
    if (error?.response?.status === 401) {
      console.info("No active session to delete.");
    } else {
      console.error("Failed to delete session:", error);
    }
  }

  await persistor.purge();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLoginAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(googleLoginAction.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoading = false;
      })
      .addCase(googleLoginAction.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        // Call reducer logic to clear auth state
        authSlice.caseReducers.clearAuthState(state);
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
