export interface Shape {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ShapeCreate {
  name: string;
  isActive: boolean;
}

export type ShapeUpdate = ShapeCreate;
