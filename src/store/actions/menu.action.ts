import { createAsyncThunk } from "@reduxjs/toolkit";
import { MenuItem } from "../slices/menu/menu.state";
import {
  uploadImageAndAddMenuItem,
  fetchMenuItems,
  updateMenuItem,
} from "../../services/menu.api";

export const addMenuItemAction = createAsyncThunk(
  "menuItem/add",
  async (newItem: MenuItem, { rejectWithValue }) => {
    try {
      const savedItem = await uploadImageAndAddMenuItem(newItem);
      return savedItem;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to add item");
    }
  }
);

export const updateMenuItemAction = createAsyncThunk(
  "menuItem/update",
  async ({ id, data }: { id: string | number; data: Partial<MenuItem> }, { rejectWithValue }) => {
    try {
      const savedItem = await updateMenuItem(id, data);
      return savedItem;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to update item");
    }
  }
);



export const fetchMenuItemsAction = createAsyncThunk(
  "menuItem/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const items: MenuItem[] = await fetchMenuItems();
      return items;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch items");
    }
  }
);
