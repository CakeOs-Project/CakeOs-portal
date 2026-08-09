import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse, LoginRequest, LoginResponse } from '../../../core/models/auth.model';
import { SessionService } from '../../../core/services/session.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly sessionService = inject(SessionService);
  private readonly baseUrl = `${environment.apiUrl}Auth`;

  login(dto: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<ApiResponse<LoginResponse>>(`${this.baseUrl}/login`, dto)
      .pipe(
        map((response) => {
          if (!response.success || !response.data) {
            throw new Error(response.message || 'No fue posible iniciar sesión.');
          }

          return response.data;
        }),
        tap((session) => this.sessionService.setSession(session)),
      );
  }

  logout(): void {
    this.sessionService.clearSession();
  }
}
