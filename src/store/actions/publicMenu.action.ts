import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPublicMenu } from "@/services/publicMenu.api";

export const fetchPublicMenuAction = createAsyncThunk(
  "publicMenu/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPublicMenu();
    } catch (err: any) {
      return rejectWithValue(err.message || "Fetch public menu failed");
    }
  }
);
