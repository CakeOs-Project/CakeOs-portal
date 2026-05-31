import { Routes } from '@angular/router';
import { Login } from './feature/security/login/pages/login-pages.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: Login,
  }
];

