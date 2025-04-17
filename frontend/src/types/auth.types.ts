export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
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
  role: Role;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
}

export type OtpType = "password" | "email";
