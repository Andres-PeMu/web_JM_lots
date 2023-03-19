import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOexpensesComponent } from './card-oexpenses.component';

describe('CardOexpensesComponent', () => {
  let component: CardOexpensesComponent;
  let fixture: ComponentFixture<CardOexpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardOexpensesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOexpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
