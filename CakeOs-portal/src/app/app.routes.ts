import { Routes } from '@angular/router';
import { Login } from './feature/auth/page/login/login';
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
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
