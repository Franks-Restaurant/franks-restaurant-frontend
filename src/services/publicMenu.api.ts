import apiClient from "./apiClient";

const MENU_API_URL = "/api/public/menu";

export const fetchPublicMenu = async () => {
  const res = await apiClient.get(MENU_API_URL);
  const menu = res.data;

  // Optional: add id if needed
  return menu;
};
