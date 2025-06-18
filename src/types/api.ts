// src/types/api.ts

export interface LoginRequest {
  email: string;
  password: string;
  username: string;
}

export interface LoginResponse {
  username: string;
  token: string;
  message?: string;
}
