import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Form, FormCreate, FormUpdate } from '../models/form.model';

@Injectable({ providedIn: 'root' })
export class FormService extends BaseCrudService<Form, FormCreate, FormUpdate> {
  protected readonly resourcePath = 'security/Form';

  getActive(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.baseUrl}/active`);
  }

  getByModule(moduleId: number): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.baseUrl}/by-module/${moduleId}`);
  }
}
