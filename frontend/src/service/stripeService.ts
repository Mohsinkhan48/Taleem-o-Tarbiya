import axios from "axios";
import { SERVER_URL } from "../constants/env.constants";

export const createCheckoutSession = async (items: String[]) => {
  return await axios.post(`${SERVER_URL}/payments/create-checkout-session`, {
    items,
  });
};
