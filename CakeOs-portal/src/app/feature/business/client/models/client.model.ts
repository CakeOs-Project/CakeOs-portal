export interface Client {
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

export interface ClientCreate {
  name: string;
  lastName: string;
  typeDocument: string;
  document: string;
  phone: string;
  address: string;
  email: string;
}

export type ClientUpdate = ClientCreate;
