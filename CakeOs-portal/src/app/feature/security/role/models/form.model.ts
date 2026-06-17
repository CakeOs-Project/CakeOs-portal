export interface Form {
  id: number;
  name: string;
  description: string;
  route: string;
  isActive: boolean;
}

export interface FormCreate {
  name: string;
  description: string;
  route: string;
}

export type FormUpdate = FormCreate;
