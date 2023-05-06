import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiseGoComponent } from './invoise-go.component';

describe('InvoiseGoComponent', () => {
  let component: InvoiseGoComponent;
  let fixture: ComponentFixture<InvoiseGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiseGoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiseGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
