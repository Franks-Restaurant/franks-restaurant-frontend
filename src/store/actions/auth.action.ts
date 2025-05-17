// ✅ GOOD: only imports helper/services/types
import { loginWithGoogle } from "@/services/auth.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface GoogleUser {
  name: string;
  email: string;
  profilePic?: string;
}

export const googleLoginAction = createAsyncThunk(
  "auth/googleLogin",
  async (googleUser: GoogleUser, { rejectWithValue }) => {
    try {
      const response = await loginWithGoogle(googleUser); // e.g., API call
      return response;
    } catch (error) {
      return rejectWithValue("Google login failed");
    }
  }
);
