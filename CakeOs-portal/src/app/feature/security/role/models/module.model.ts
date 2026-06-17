export interface ModuleEntity {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface ModuleEntityCreate {
  name: string;
  description: string;
  isActive: boolean;
}

export type ModuleEntityUpdate = ModuleEntityCreate;
