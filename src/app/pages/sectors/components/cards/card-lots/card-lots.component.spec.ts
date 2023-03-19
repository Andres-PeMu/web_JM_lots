import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLotsComponent } from './card-lots.component';

describe('CardLotsComponent', () => {
  let component: CardLotsComponent;
  let fixture: ComponentFixture<CardLotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
