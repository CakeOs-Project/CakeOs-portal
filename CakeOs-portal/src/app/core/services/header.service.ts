import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const DEFAULT_ROUTE_TITLES: Record<string, string> = {
  'dashboard': 'Panel Principal',
  'factura': 'Nueva Factura',
  'produccion': 'Producción',
  'clientes': 'Clientes',
  'productos': 'Productos',
  'pedidos': 'Pedidos',
  'pagos': 'Pagos',
  'reportes': 'Reportes',
  'usuarios': 'Usuarios',
  'roles': 'Roles',
  'parametros': 'Parámetros',
};

@Injectable({ providedIn: 'root' })
export class HeaderService {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly _title = signal<string>('Nueva Factura');
  private readonly _searchQuery = signal<string>('');

  readonly title = this._title.asReadonly();
  readonly searchQuery = this._searchQuery.asReadonly();

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitleFromRoute();
      });

    this.updateTitleFromRoute();
  }

  setTitle(newTitle: string): void {
    this._title.set(newTitle);
  }

  setSearchQuery(query: string): void {
    this._searchQuery.set(query);
  }

  private updateTitleFromRoute(): void {
    try {
      let route = this.activatedRoute?.firstChild;
      let titleFromData: string | undefined;

      while (route) {
        if (route.snapshot?.data && route.snapshot.data['title']) {
          titleFromData = route.snapshot.data['title'];
        }
        if (route.firstChild) {
          route = route.firstChild;
        } else {
          break;
        }
      }

      if (titleFromData) {
        this._title.set(titleFromData);
        return;
      }

      const url = this.router?.url ? this.router.url.split('?')[0] : '';
      const segments = url ? url.split('/').filter(Boolean) : [];

      for (let i = segments.length - 1; i >= 0; i--) {
        const segment = segments[i]?.toLowerCase();
        if (segment && DEFAULT_ROUTE_TITLES[segment]) {
          this._title.set(DEFAULT_ROUTE_TITLES[segment]);
          return;
        }
      }

      if (segments.length > 0) {
        const last = segments[segments.length - 1];
        const formatted = last.charAt(0).toUpperCase() + last.slice(1).replace(/-/g, ' ');
        this._title.set(formatted);
      }
    } catch {
      // Ignore initial edge cases
    }
  }
}
