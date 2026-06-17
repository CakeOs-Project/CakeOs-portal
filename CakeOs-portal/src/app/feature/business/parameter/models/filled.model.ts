export interface Filled {
  id: number;
  name: string;
  defaultFilled: boolean;
  isActive: boolean;
}

export interface FilledCreate {
  name: string;
  defaultFilled: boolean;
  isActive: boolean;
}

export type FilledUpdate = FilledCreate;
