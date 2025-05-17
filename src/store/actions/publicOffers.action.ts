import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPublicOffers } from "@/services/publicOffers.api";

export const fetchPublicOffersAction = createAsyncThunk(
  "publicOffers/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchPublicOffers();
    } catch (err: any) {
      return rejectWithValue(err.message || "Fetch public offers failed");
    }
  }
);
