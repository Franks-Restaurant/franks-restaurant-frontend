import apiClient from "./apiClient";

const OFFERS_API_URL = "/api/public/offers";

export const fetchPublicOffers = async () => {
  const res = await apiClient.get(OFFERS_API_URL);
  const offers = res.data;

  return offers.map((offer: any) => ({
    ...offer,
    id: offer._id,
  }));
};
