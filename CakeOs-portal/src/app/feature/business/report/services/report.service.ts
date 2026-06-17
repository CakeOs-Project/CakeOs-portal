import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Report`;

  getDailyPayment<T = unknown>(date: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/daily/payment`, { params: { date } });
  }

  getWeeklyPayment<T = unknown>(date: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/weekly/payment`, { params: { date } });
  }

  getMonthlySummary<T = unknown>(date: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/summary/monthly`, { params: { date } });
  }

  getCustomSummary<T = unknown>(from: string, to: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/summary/custom`, { params: { from, to } });
  }
}
