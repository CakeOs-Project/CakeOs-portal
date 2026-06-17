import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Permission, PermissionCreate, PermissionUpdate } from '../models/permission.model';

@Injectable({ providedIn: 'root' })
export class PermissionService extends BaseCrudService<Permission, PermissionCreate, PermissionUpdate> {
  protected readonly resourcePath = 'security/Permission';
}
