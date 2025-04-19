import { SERVER_URL } from "../constants/env.constants";
import apiClient from "../api/apiClient";

// Define payload types
interface CartPayload {
  courseId: string;
}

export const CartService = {
  addToCart: async (data: CartPayload) => {
    return await apiClient.post(`${SERVER_URL}cart/add`, data);
  },

  removeFromCart: async (data: CartPayload) => {
    return await apiClient.delete(`${SERVER_URL}cart/remove/${data.courseId}`,);
  },  

  getCart: async () => {
    return await apiClient.get(`${SERVER_URL}cart/get`);
  },

  clearCart: async () => {
    return await apiClient.delete(`${SERVER_URL}cart/clear`);
  },
};
