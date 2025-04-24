import apiClient from "../api/apiClient";

export const fetchGenericService = {
  fetchAll: async (endpoint: string) => {
    return await apiClient.get(endpoint);
  },
};
