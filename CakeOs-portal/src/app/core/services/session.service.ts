import { Injectable, PLATFORM_ID, computed, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoginResponse, PermissionAction } from '../models/auth.model';

const SESSION_STORAGE_KEY = 'cakeos.session';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly _session = signal<LoginResponse | null>(this.restoreSession());

  readonly session = this._session.asReadonly();
  readonly isAuthenticated = computed(() => this._session() !== null);
  readonly token = computed(() => this._session()?.token ?? null);
  readonly fullName = computed(() => this._session()?.fullName ?? null);
  readonly email = computed(() => this._session()?.email ?? null);
  readonly rolId = computed(() => this._session()?.rolId ?? null);
  readonly rolName = computed(() => this._session()?.rolName ?? null);
  readonly tenantId = computed(() => this._session()?.tenantId ?? null);
  readonly modules = computed(() => this._session()?.modules ?? []);

  setSession(session: LoginResponse): void {
    this._session.set(session);

    if (this.isBrowser) {
      localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    }
  }

  clearSession(): void {
    this._session.set(null);

    if (this.isBrowser) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }

  hasModule(moduleName: string): boolean {
    return this.modules().some((module) => module.moduleName === moduleName);
  }

  hasFormAccess(moduleName: string, formName: string): boolean {
    const module = this.modules().find((m) => m.moduleName === moduleName);
    return !!module?.forms.some((form) => form.formName === formName);
  }

  hasPermission(moduleName: string, formName: string, permission: PermissionAction): boolean {
    const module = this.modules().find((m) => m.moduleName === moduleName);
    const form = module?.forms.find((f) => f.formName === formName);
    return form?.permissions.includes(permission) ?? false;
  }

  private restoreSession(): LoginResponse | null {
    if (!this.isBrowser) {
      return null;
    }

    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    try {
      return JSON.parse(raw) as LoginResponse;
    } catch {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
  }
}
