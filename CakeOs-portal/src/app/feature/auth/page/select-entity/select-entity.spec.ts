import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SelectEntity } from './select-entity';

describe('SelectEntity', () => {
  let component: SelectEntity;
  let fixture: ComponentFixture<SelectEntity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEntity],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEntity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
