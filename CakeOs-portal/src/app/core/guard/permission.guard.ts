import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { PermissionAction } from '../models/auth.model';
import { SessionService } from '../services/session.service';

/**
 * Reads `module`, `form` and (optionally) `permission` from the route `data`
 * and checks them against the modules/forms/permissions returned by login.
 *
 * route data example:
 *   data: { module: 'Usuarios', form: 'UserForm', permission: 'Read' }
 */
export const permissionGuard: CanActivateFn = (route) => {
  const sessionService = inject(SessionService);

  const moduleName = route.data['module'] as string | undefined;
  const formName = route.data['form'] as string | undefined;
  const permission = (route.data['permission'] as PermissionAction | undefined) ?? 'Read';

  if (!moduleName || !formName) {
    return true;
  }

  return sessionService.hasPermission(moduleName, formName, permission);
};
