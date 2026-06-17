import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Invoice, InvoiceCreate, InvoiceTodayRange } from '../models/invoice.model';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/Invoice`;

  create(dto: InvoiceCreate, userId: number): Observable<Invoice> {
    return this.http.post<Invoice>(this.baseUrl, dto, { params: { userId } });
  }

  getById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/${id}`);
  }

  getToday(range: InvoiceTodayRange): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/today`, { params: { range } });
  }
}
