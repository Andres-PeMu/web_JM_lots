import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSectorComponent } from './card-sector.component';

describe('CardSectorComponent', () => {
  let component: CardSectorComponent;
  let fixture: ComponentFixture<CardSectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
