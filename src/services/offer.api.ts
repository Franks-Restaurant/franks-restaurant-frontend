import apiClient from "./apiClient";
const API_URL = "/api/offers";

export const fetchOffers = async () => {
  const res = await apiClient.get(API_URL);
  const offers = res.data;

  // Map _id to id
  return offers.map((offer: any) => ({
    ...offer,
    id: offer._id,
  }));
};

export const addOffer = async (data: any) => {
  const res = await apiClient.post(API_URL, data);
  return res.data;
};

export const updateOffer = async (id: string|number, data: any) => {
  const res = await apiClient.put(`${API_URL}/${id}`, data);
  return res.data;
};
