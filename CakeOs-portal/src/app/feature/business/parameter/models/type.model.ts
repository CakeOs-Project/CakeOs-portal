export interface ProductType {
  id: number;
  name: string;
  isActive: boolean;
}

export interface ProductTypeCreate {
  name: string;
  isActive: boolean;
}

export type ProductTypeUpdate = ProductTypeCreate;
