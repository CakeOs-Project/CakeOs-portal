import { Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';

export const INVOICE_ROUTES: Routes = [
  {
    path: '',
    component: InvoiceComponent,
    data: { title: 'Nueva Factura' },
  },
  {
    path: ':id',
    component: InvoiceDetailComponent,
    data: { title: 'Detalle de Pedido' },
  },
];
