import { Routes } from '@angular/router';
import { Login } from './feature/security/login/pages/login-pages.component';
import { InvoicePagesComponent } from './feature/business/invoice/invoice-pages.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: Login,
  },
  {
    path: 'facturas',
    component: InvoicePagesComponent,
  },
  {
    path: '',
    redirectTo: 'facturas',
    pathMatch: 'full',
  },
];
