import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpeExpensesComponent } from './ope-expenses.component';

describe('OpeExpensesComponent', () => {
  let component: OpeExpensesComponent;
  let fixture: ComponentFixture<OpeExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpeExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpeExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
