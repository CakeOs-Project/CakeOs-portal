import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

/**
 * Servicio base para entidades que exponen el CRUD estandar de CakeOS:
 * GET /, GET /{id}, POST /, PUT /{id}, PATCH /{id}/toggle-active y PATCH /{id}/delete.
 */
export abstract class BaseCrudService<T, TCreate = Partial<T>, TUpdate = TCreate> {
  protected readonly http = inject(HttpClient);

  /** Ruta relativa del recurso, ej: 'Filled' o 'security/Rol'. */
  protected abstract readonly resourcePath: string;

  protected get baseUrl(): string {
    return `${environment.apiUrl}/${this.resourcePath}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(dto: TCreate): Observable<T> {
    return this.http.post<T>(this.baseUrl, dto);
  }

  update(id: number, dto: TUpdate): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, dto);
  }

  activate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/toggle-active?isActive=true`, null);
  }

  deactivate(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/toggle-active?isActive=false`, null);
  }

  delete(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/delete`, null);
  }
}
