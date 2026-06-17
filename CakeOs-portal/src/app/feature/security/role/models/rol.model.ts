export interface Rol {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface RolCreate {
  name: string;
  description: string;
  isActive: boolean;
}

export type RolUpdate = RolCreate;
