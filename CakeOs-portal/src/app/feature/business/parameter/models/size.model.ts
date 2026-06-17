export interface Size {
  id: number;
  name: string;
  isActive: boolean;
}

export interface SizeCreate {
  name: string;
  isActive: boolean;
}

export type SizeUpdate = SizeCreate;
