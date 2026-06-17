import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { InvoiceItem } from '../models/invoice-item.model';

@Injectable({ providedIn: 'root' })
export class InvoiceItemService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/InvoiceItem`;

  getById(id: number): Observable<InvoiceItem> {
    return this.http.get<InvoiceItem>(`${this.baseUrl}/${id}`);
  }

  markReady(id: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/ready`, null);
  }
}
