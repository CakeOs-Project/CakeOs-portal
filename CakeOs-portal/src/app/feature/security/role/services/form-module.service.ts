import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { FormModule, FormModuleCreate, FormModuleUpdate } from '../models/form-module.model';

@Injectable({ providedIn: 'root' })
export class FormModuleService extends BaseCrudService<FormModule, FormModuleCreate, FormModuleUpdate> {
  protected readonly resourcePath = 'security/FormModule';
}
