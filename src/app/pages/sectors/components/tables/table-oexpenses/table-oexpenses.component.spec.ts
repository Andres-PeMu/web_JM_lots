import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOexpensesComponent } from './table-oexpenses.component';

describe('TableOexpensesComponent', () => {
  let component: TableOexpensesComponent;
  let fixture: ComponentFixture<TableOexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOexpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
