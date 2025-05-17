// import axios from "axios";
// import { GoogleUser } from "../store/slices/auth/auth.state";
// import apiClient from "./apiClient";

// export const loginWithGoogle = async (googleUser: GoogleUser) => {
//   const response = await apiClient.post("/api/auth/google-login", googleUser);
//   return response.data;
// };


// services/auth.api.ts
import { GoogleUser, User } from "@/store/slices/auth/auth.state";
import apiClient from "./apiClient";

interface LoginResponse {
  user: User;
  token: string;
}

export const loginWithGoogle = async (googleUser: GoogleUser): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/api/auth/google-login", googleUser);
  return response.data;
};
