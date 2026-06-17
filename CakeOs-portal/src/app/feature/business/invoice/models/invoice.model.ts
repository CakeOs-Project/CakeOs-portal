import { InvoiceItem, InvoiceItemCreate } from './invoice-item.model';

export interface InvoiceCreate {
  typeDocument: string;
  document: string;
  name: string;
  lastName: string;
  phone: string;
  address: string;
  email: string;
  deliveryDate: string;
  observations: string;
  hasInitialPayment: boolean;
  initialPayment: number;
  paymentMethod: number;
  items: InvoiceItemCreate[];
}

export interface Invoice extends Omit<InvoiceCreate, 'items'> {
  id: number;
  items: InvoiceItem[];
}

/** Rango para GET /Invoice/today: 0 = dia, 1 = semana, 2 = mes. */
export enum InvoiceTodayRange {
  Day = 0,
  Week = 1,
  Month = 2,
}
