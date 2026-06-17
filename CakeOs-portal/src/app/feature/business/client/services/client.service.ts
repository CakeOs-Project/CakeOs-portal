import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Client, ClientCreate, ClientUpdate } from '../models/client.model';

@Injectable({ providedIn: 'root' })
export class ClientService extends BaseCrudService<Client, ClientCreate, ClientUpdate> {
  protected readonly resourcePath = 'Client';

  getByDocument(documentNumber: string): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/document`, {
      params: { documentNumber },
    });
  }
}
