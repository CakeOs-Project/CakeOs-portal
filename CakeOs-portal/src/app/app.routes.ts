import { Routes } from '@angular/router';
import { Base } from './core/shared/base/base';
import { loginGuard } from './core/guard/login.guard';
import { Login } from './feature/auth/page/login/login';
import { ForgotPassword } from './feature/auth/page/forgot-password/forgot-password';
import { SelectEntity } from './feature/auth/page/select-entity/select-entity';

export const routes: Routes = [
  {
    path: 'auth',
    component: Login,
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPassword,
  },
  {
    path: 'auth/select-entity',
    component: SelectEntity,
  },
  {
    path: '',
    component: Base,
    canActivate: [loginGuard],
    canActivateChild: [loginGuard],
    children: [
      {
        path: 'facturas',
        loadChildren: () =>
          import('./feature/business/invoice/invoice.routes').then((m) => m.INVOICE_ROUTES),
      },
      // Nuevos módulos: agregar aquí su propio <modulo>.routes.ts
    ],
  },
  {
    path: '',
    redirectTo: 'facturas',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'facturas',
  },
];
