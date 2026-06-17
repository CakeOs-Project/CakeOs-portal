import { Injectable } from '@angular/core';
import { BaseCrudService } from '../../../../core/services/base-crud.service';
import { Person, PersonCreate, PersonUpdate } from '../models/person.model';

@Injectable({ providedIn: 'root' })
export class PersonService extends BaseCrudService<Person, PersonCreate, PersonUpdate> {
  protected readonly resourcePath = 'security/Person';
}
