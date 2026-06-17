import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Shape, ShapeCreate, ShapeUpdate } from '../models/shape.model';

@Injectable({ providedIn: 'root' })
export class ShapeService extends BaseCrudService<Shape, ShapeCreate, ShapeUpdate> {
  protected readonly resourcePath = 'Shape';
}
