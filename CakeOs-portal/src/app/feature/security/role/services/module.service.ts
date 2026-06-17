import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { ModuleEntity, ModuleEntityCreate, ModuleEntityUpdate } from '../models/module.model';

@Injectable({ providedIn: 'root' })
export class ModuleService extends BaseCrudService<ModuleEntity, ModuleEntityCreate, ModuleEntityUpdate> {
  protected readonly resourcePath = 'security/Module';
}
