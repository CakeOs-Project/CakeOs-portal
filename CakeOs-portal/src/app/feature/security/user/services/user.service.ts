import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { ChangePasswordRequest, User, UserCreate, UserUpdate } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseCrudService<User, UserCreate, UserUpdate> {
  protected readonly resourcePath = 'security/User';

  getByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/by-email`, { params: { email } });
  }

  changePassword(id: number, dto: ChangePasswordRequest): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${id}/change-password`, dto);
  }
}
