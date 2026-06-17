export interface PaymentCreate {
  invoiceId: number;
  amount: number;
  paymentMethod: number;
  paymentType: number;
}

export interface Payment extends PaymentCreate {
  id: number;
}
