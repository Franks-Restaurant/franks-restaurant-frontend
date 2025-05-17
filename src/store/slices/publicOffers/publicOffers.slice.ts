import { createSlice } from "@reduxjs/toolkit";
import { fetchPublicOffersAction } from "@/store/actions/publicOffers.action";

const publicOffersSlice = createSlice({
  name: "publicOffers",
  initialState: {
    offers: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicOffersAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicOffersAction.fulfilled, (state, action) => {
        state.loading = false;
        state.offers = action.payload;
      })
      .addCase(fetchPublicOffersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default publicOffersSlice.reducer;
