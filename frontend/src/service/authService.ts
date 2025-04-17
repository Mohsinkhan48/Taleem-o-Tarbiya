import axios from "axios";
import { LoginPayload, RegisterPayload } from "../types/auth.types";
import { SERVER_URL } from "../constants/env.constants";
import apiClient from "../api/apiClient";
import { otpResetPasswordPayload } from "../redux/slices/otpPasswordResetSlice";
import { ResetPasswordPayload } from "../redux/slices/resetPasswordSlice";
import getDeviceId from "../utils/getDeviceId";

export const AuthService = {
  register: async (data: RegisterPayload) => {
    return await axios.post(`${SERVER_URL}auth/register`, data);
  },

  login: async (data: LoginPayload) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    return await axios.post(`${SERVER_URL}auth/login`, payload, {
      headers: { device_id: data.device_id },
    });
  },
  verifyEmailOtp: async (otp: string) => {
    return await apiClient.post(`${SERVER_URL}auth/verify-email`, { otp });
  },
  verifyPasswordOtp: async (otpData: otpResetPasswordPayload) => {
    return await axios.post(`${SERVER_URL}auth/reset-password-otp-verification`, otpData);
  },
  forgotPassword: async (email: string) => {
    return await axios.post(`${SERVER_URL}auth/forget-password`, { email });
  },
  resetPassword: async (payload: ResetPasswordPayload) => {
    return await axios.put(`${SERVER_URL}auth/reset-password`, payload);
  },
  logout: async () => {
    return await apiClient.delete(`${SERVER_URL}auth/logout`, {
      headers: { device_id: getDeviceId() },
    });
  }
};
