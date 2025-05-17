import { MenuItem } from "@/store/slices/menu/menu.state";
import apiClient from "./apiClient";
import axios from "axios";

export const uploadImageAndAddMenuItem = async (newItem: MenuItem) => {
  // 1. Upload image to Cloudinary
  const formData = new FormData();
  formData.append("file", newItem.image);
  formData.append("upload_preset", "franks_restaurant");
  formData.append("cloud_name", "dhduflocz");

  const cloudinaryRes = await axios.post(
    "https://api.cloudinary.com/v1_1/dhduflocz/image/upload",
    formData
  );

  const imageUrl = cloudinaryRes.data.secure_url;

  // 2. Prepare item with image URL (remove temp ID if backend auto-generates)
  const itemToSave = {
    ...newItem,
    image: imageUrl,
  };
  delete (itemToSave as any).id;

  // 3. Call backend API to save item (auth token handled by apiClient)
  const response = await apiClient.post("/api/menu", itemToSave);

  return response.data;
};


export const updateMenuItem = async (
  id: string | number,
  updatedData: Partial<MenuItem>
) => {
  let imageUrl = updatedData.image ?? "";

  if (imageUrl && imageUrl.startsWith("data:")) {
    const formData = new FormData();
    formData.append("file", imageUrl);
    formData.append("upload_preset", "franks_restaurant");
    formData.append("cloud_name", "dhduflocz");

    const cloudinaryRes = await axios.post(
      "https://api.cloudinary.com/v1_1/dhduflocz/image/upload",
      formData
    );

    imageUrl = cloudinaryRes.data.secure_url;
  }

  const itemToUpdate = {
    ...updatedData,
    image: imageUrl,
  };

  // IMPORTANT: Do NOT send _id or id in the body for update
  const { id: _discard, ...rest } = itemToUpdate;

  const response = await apiClient.put(`/api/menu/${id}`, rest);

  return response.data;
};




export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  const response = await apiClient.get("/api/menu");
  return response.data;
};