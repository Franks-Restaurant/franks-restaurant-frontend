import { createSlice } from "@reduxjs/toolkit";
import { fetchPublicMenuAction } from "@/store/actions/publicMenu.action";

const publicMenuSlice = createSlice({
  name: "publicMenu",
  initialState: {
    menu: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicMenuAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublicMenuAction.fulfilled, (state, action) => {
        state.loading = false;
        state.menu = action.payload;
      })
      .addCase(fetchPublicMenuAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default publicMenuSlice.reducer;
