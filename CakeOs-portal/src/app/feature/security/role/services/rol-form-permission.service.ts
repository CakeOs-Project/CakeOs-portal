import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import {
  RolFormPermission,
  RolFormPermissionCreate,
  RolFormPermissionUpdate,
} from '../models/rol-form-permission.model';

@Injectable({ providedIn: 'root' })
export class RolFormPermissionService extends BaseCrudService<
  RolFormPermission,
  RolFormPermissionCreate,
  RolFormPermissionUpdate
> {
  protected readonly resourcePath = 'security/RolFormPermission';
}
