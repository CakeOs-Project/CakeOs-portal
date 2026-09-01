export interface WizardClientInfo {
  fullName: string;
  phone: string;
  email: string;
  fulfillmentMethod: 'pickup' | 'delivery';
  fulfillmentDateTime: string;
}

export interface WizardItem {
  id: string;
  productId: number;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  decorationDescription?: string;
}

export interface WizardPhoto {
  id: string;
  url: string;
  name: string;
}

export enum InvoiceStep {
  ClientInfo = 1,
  Items = 2,
  Details = 3,
  Summary = 4,
}
