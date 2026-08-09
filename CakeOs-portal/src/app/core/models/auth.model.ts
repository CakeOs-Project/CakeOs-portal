export type PermissionAction = 'Create' | 'Read' | 'Update' | 'Delete';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface FormPermissions {
  formName: string;
  permissions: PermissionAction[];
}

export interface ModuleAccess {
  moduleName: string;
  forms: FormPermissions[];
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  expiration: string;
  userId: number;
  rolId: number;
  rolName: string;
  tenantId: number;
  fullName: string;
  email: string;
  isCompleteInfo: boolean;
  modules: ModuleAccess[];
}

/** Contrato común que devuelve la API para las respuestas exitosas. */
export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T | null;
  errors?: Record<string, string[]>;
}
