export interface Permission {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface PermissionCreate {
  name: string;
  description: string;
  isActive: boolean;
}

export type PermissionUpdate = PermissionCreate;
