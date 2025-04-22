import apiClient from "../api/apiClient";

export const UserService = {
  getProfile: async () => {
    const response = await apiClient.get("/auth/profile");
    return response.data;
  },
  getRoles: async () => {
    return await apiClient.get("/auth/roles");
  }
};
