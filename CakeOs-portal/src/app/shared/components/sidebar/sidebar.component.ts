import { Component, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';

interface MenuItem {
  label: string;
  icon: SafeHtml;
  route?: string;
}

interface ModuleMenuConfig {
  label: string;
  icon: keyof typeof ICONS;
  route?: string;
}

const ICONS: Record<string, string> = {
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
  clientes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  productos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>`,
  pedidos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h6"/></svg>`,
  pagos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,
  reportes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  security: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  usuarios: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  roles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3 4-4-3-3"/></svg>`,
  parametros: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>`,
};

/** Item de menu fijo, visible sin importar los modulos del login. */
const DASHBOARD_ITEM: ModuleMenuConfig = { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' };

/**
 * Mapea `moduleName` (tal como viene en `LoginResponse.modules`) a la
 * presentacion del item en el sidebar. Si el backend agrega un modulo nuevo
 * que no esta aqui, se muestra con el icono/ruta por defecto hasta que se
 * registre su entrada.
 */
const MODULE_MENU: Record<string, ModuleMenuConfig> = {
  Seguridad: { label: 'Seguridad', icon: 'security', route: '/seguridad/usuarios' },
  Usuarios: { label: 'Usuarios', icon: 'usuarios', route: '/seguridad/usuarios' },
  Roles: { label: 'Roles', icon: 'roles', route: '/seguridad/roles' },
  Clientes: { label: 'Clientes', icon: 'clientes', route: '/clientes' },
  Productos: { label: 'Productos', icon: 'productos', route: '/productos' },
  Parametros: { label: 'Parámetros', icon: 'parametros', route: '/parametros' },
  Facturas: { label: 'Factura', icon: 'pedidos', route: '/factura' },
  Pagos: { label: 'Pagos', icon: 'pagos', route: '/pagos' },
  Reportes: { label: 'Reportes', icon: 'reportes', route: '/reportes' },
};

const DEFAULT_MODULE_ICON: keyof typeof ICONS = 'dashboard';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class Sidebar {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly sessionService = inject(SessionService);

  /** Conserva el modo compacto durante la navegacion sin duplicar el menu. */
  readonly collapsed = signal(false);

  readonly menuItems = computed<MenuItem[]>(() => {
    const items = [this.toMenuItem(DASHBOARD_ITEM)];

    for (const module of this.sessionService.modules()) {
      const config = MODULE_MENU[module.moduleName] ?? {
        label: module.moduleName,
        icon: DEFAULT_MODULE_ICON,
      };
      items.push(this.toMenuItem(config));
    }

    return items;
  });

  toggle(): void {
    this.collapsed.update((isCollapsed) => !isCollapsed);
  }

  private toMenuItem(config: ModuleMenuConfig): MenuItem {
    return { label: config.label, icon: this.icon(config.icon), route: config.route };
  }

  private icon(name: keyof typeof ICONS): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(ICONS[name]);
  }
}
