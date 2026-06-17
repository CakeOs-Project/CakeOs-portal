export interface Person {
  id: number;
  name: string;
  lastName: string;
  typeDocument: string;
  document: string;
  phone: string;
  address: string;
  email: string;
  isActive: boolean;
}

export interface PersonCreate {
  name: string;
  lastName: string;
  typeDocument: string;
  document: string;
  phone: string;
  address: string;
  email: string;
}

export type PersonUpdate = PersonCreate;
