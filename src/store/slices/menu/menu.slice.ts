import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuItem, MenuItemState } from "./menu.state";
import {
  addMenuItemAction,
  fetchMenuItemsAction,
} from "@/store/actions/menu.action";

const initialState: MenuItemState = {
  items: [],
  loading: false,
  error: null,
};

const menuItemSlice = createSlice({
  name: "menuItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addMenuItemAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMenuItemAction.fulfilled, (state, action: PayloadAction<MenuItem>) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addMenuItemAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMenuItemsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItemsAction.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
        state.loading = false;
        state.items = action.payload; // ✅ Replace entire array
      })
      .addCase(fetchMenuItemsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default menuItemSlice.reducer;
