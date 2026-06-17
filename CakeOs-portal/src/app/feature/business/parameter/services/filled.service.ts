import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Filled, FilledCreate, FilledUpdate } from '../models/filled.model';

@Injectable({ providedIn: 'root' })
export class FilledService extends BaseCrudService<Filled, FilledCreate, FilledUpdate> {
  protected readonly resourcePath = 'Filled';
}
