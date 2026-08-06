export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface CurrentUser {
  id: number;
  username: string;
  name: string;
  role: "ADMIN" | "SUPER_ADMIN";
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCurrentUserRequest {
  name?: string;
  oldPassword?: string;
  newPassword?: string;
}