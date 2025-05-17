import { addOfferAction, fetchOffersAction, updateOfferAction } from "@/store/actions/offer.action";
import { createSlice } from "@reduxjs/toolkit";

const offerSlice = createSlice({
  name: "offer",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addOfferAction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateOfferAction.fulfilled, (state, action) => {
        const index = state.items.findIndex((i: any) => i._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      });
  },
});

export default offerSlice.reducer;
