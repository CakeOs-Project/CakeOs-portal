import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

export const INVOICE_ROUTES: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    data: { title: 'New Invoice' },
  },
  {
    path: ':id',
    component: InvoiceDetailComponent,
    data: { title: 'Order Details' },
  },
];
