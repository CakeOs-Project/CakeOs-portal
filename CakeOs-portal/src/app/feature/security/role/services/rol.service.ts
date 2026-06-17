import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Rol, RolCreate, RolUpdate } from '../models/rol.model';

@Injectable({ providedIn: 'root' })
export class RolService extends BaseCrudService<Rol, RolCreate, RolUpdate> {
  protected readonly resourcePath = 'security/Rol';
}
