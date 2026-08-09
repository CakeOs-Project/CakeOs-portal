import { Component, signal } from '@angular/core';

type Period = 'Día' | 'Semana' | 'Mes';
interface PaymentMethod { name: string; amount: string; percentage: number; }
interface Product { name: string; detail: string; percentage: number; }

@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html', styleUrl: './dashboard.component.css' })
export class DashboardComponent {
  readonly period = signal<Period>('Semana');
  readonly periods: Period[] = ['Día', 'Semana', 'Mes'];
  readonly paymentMethods: PaymentMethod[] = [
    { name: 'Efectivo', amount: '$ 2.480.000', percentage: 37 },
    { name: 'Transferencia', amount: '$ 3.120.000', percentage: 47 },
    { name: 'Tarjeta', amount: '$ 1.040.000', percentage: 16 },
  ];
  readonly products: Product[] = [
    { name: 'Torta redonda 2 pisos', detail: '34 u · $ 5.270.000', percentage: 35 },
    { name: 'Cheesecake frutos rojos', detail: '28 u · $ 3.640.000', percentage: 29 },
    { name: 'Torta matera', detail: '61 u · $ 3.660.000', percentage: 63 },
    { name: 'Cupcakes surtidos', detail: '96 u · $ 1.920.000', percentage: 44 },
  ];
  setPeriod(period: Period): void { this.period.set(period); }
  exportClose(): void { console.info('Exportar cierre'); }
}
