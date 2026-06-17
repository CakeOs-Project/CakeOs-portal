import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Product, ProductCreate, ProductUpdate } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService extends BaseCrudService<Product, ProductCreate, ProductUpdate> {
  protected readonly resourcePath = 'Product';

  search(term: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/search/${term}`);
  }
}
