import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchOffers, addOffer, updateOffer } from "../../services/offer.api";

export const fetchOffersAction = createAsyncThunk(
  "offer/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await fetchOffers();
    } catch (err: any) {
      return rejectWithValue(err.message || "Fetch failed");
    }
  }
);

export const addOfferAction = createAsyncThunk(
  "offer/add",
  async (offer: any, { rejectWithValue }) => {
    try {
      return await addOffer(offer);
    } catch (err: any) {
      return rejectWithValue(err.message || "Add failed");
    }
  }
);

export const updateOfferAction = createAsyncThunk(
  "offer/update",
  async ({ id, data }: { id: string|number; data: any }, { rejectWithValue }) => {
    try {
      return await updateOffer(id, data);
    } catch (err: any) {
      return rejectWithValue(err.message || "Update failed");
    }
  }
);
