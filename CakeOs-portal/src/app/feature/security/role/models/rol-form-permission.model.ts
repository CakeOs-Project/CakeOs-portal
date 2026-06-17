export interface RolFormPermission {
  id: number;
  rolId: number;
  formId: number;
  permissionId: number;
  isActive: boolean;
}

export interface RolFormPermissionCreate {
  rolId: number;
  formId: number;
  permissionId: number;
  isActive: boolean;
}

export type RolFormPermissionUpdate = RolFormPermissionCreate;
