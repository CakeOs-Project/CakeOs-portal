import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { ProductType, ProductTypeCreate, ProductTypeUpdate } from '../models/type.model';

@Injectable({ providedIn: 'root' })
export class TypeService extends BaseCrudService<ProductType, ProductTypeCreate, ProductTypeUpdate> {
  protected readonly resourcePath = 'Type';
}
