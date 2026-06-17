export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export type ProductUpdate = ProductCreate;
