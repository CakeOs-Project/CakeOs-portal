import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicePagesComponent } from './invoice-pages.component';

describe('InvoicePagesComponent', () => {
  let component: InvoicePagesComponent;
  let fixture: ComponentFixture<InvoicePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoicePagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicePagesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
