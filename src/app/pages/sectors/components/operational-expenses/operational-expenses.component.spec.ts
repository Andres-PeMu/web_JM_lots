import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalExpensesComponent } from './operational-expenses.component';

describe('OperationalExpensesComponent', () => {
  let component: OperationalExpensesComponent;
  let fixture: ComponentFixture<OperationalExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalExpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
