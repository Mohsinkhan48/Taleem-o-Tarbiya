import { Role } from "../redux/slices/fetch/fetchSlices";

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  device_id: string;
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  isEmailVerified: boolean;
  role?: Role;
  university?: string
}

export type OtpType = "password" | "email";
