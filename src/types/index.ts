import { Responses } from "@blockfrost/blockfrost-js";

export type ServerResponse<Data> = {
  isSuccess: boolean;
  message: string;
  data: Data | null;
};


export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UpdateUserProfileRequest {
  name?: string;
  avatar?: string;
}