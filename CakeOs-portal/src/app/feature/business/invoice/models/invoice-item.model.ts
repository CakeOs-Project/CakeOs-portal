export interface InvoiceItemCreate {
  productId: number;
  quantity: number;
  unitPrice: number;
  hasFilling: boolean;
  filledId: number;
  hasDecoration: boolean;
  imageId: number;
  decorationDescription: string;
  hasMessage: boolean;
  message: string;
}

export interface InvoiceItem extends InvoiceItemCreate {
  id: number;
  invoiceId: number;
  isReady: boolean;
}
