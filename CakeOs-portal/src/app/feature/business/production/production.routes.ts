import { Routes } from '@angular/router';
import { ProductionComponent } from './production.component';

export const PRODUCTION_ROUTES: Routes = [
  {
    path: '',
    component: ProductionComponent,
    data: { title: 'Producción' },
  },
];
