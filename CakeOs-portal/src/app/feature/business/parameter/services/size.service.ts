import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Size, SizeCreate, SizeUpdate } from '../models/size.model';

@Injectable({ providedIn: 'root' })
export class SizeService extends BaseCrudService<Size, SizeCreate, SizeUpdate> {
  protected readonly resourcePath = 'Size';
}
