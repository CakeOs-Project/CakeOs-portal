export interface FormModule {
  id: number;
  formId: number;
  moduleId: number;
  isActive: boolean;
}

export interface FormModuleCreate {
  formId: number;
  moduleId: number;
  isActive: boolean;
}

export type FormModuleUpdate = FormModuleCreate;
