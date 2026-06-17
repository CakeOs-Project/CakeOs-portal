import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { PermissionAction } from '../../core/models/auth.model';
import { SessionService } from '../../core/services/session.service';

export interface HasPermissionConfig {
  module: string;
  form: string;
  permission?: PermissionAction;
}

/**
 * Muestra el contenido solo si el rol del usuario (datos del login) tiene
 * el permiso indicado para ese modulo/formulario.
 * Uso: *appHasPermission="{ module: 'Usuarios', form: 'UserForm', permission: 'Create' }"
 */
@Directive({
  selector: '[appHasPermission]',
})
export class HasPermissionDirective {
  private readonly sessionService = inject(SessionService);
  private readonly templateRef = inject(TemplateRef<unknown>);
  private readonly viewContainer = inject(ViewContainerRef);

  private hasView = false;

  @Input({ required: true }) set appHasPermission(config: HasPermissionConfig) {
    const { module, form, permission = 'Read' } = config;
    const allowed = this.sessionService.hasPermission(module, form, permission);

    if (allowed && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!allowed && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
