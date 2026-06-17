export interface User {
  id: number;
  personId: number;
  email: string;
  rolId: number;
  isActive: boolean;
}

export interface UserCreate {
  personId: number;
  email: string;
  password: string;
  rolId: number;
}

export type UserUpdate = Omit<UserCreate, 'password'>;

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
