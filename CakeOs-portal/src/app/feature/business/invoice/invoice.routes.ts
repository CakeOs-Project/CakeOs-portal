import { Routes } from '@angular/router';
import { InvoicePagesComponent } from './invoice-pages.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

export const INVOICE_ROUTES: Routes = [
  {
    path: '',
    component: InvoicePagesComponent,
  },
  {
    path: ':id',
    component: InvoiceDetailComponent,
  },
];
