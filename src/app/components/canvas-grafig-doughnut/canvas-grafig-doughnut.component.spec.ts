import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasGrafigDoughnutComponent } from './canvas-grafig-doughnut.component';

describe('CanvasGrafigDoughnutComponent', () => {
  let component: CanvasGrafigDoughnutComponent;
  let fixture: ComponentFixture<CanvasGrafigDoughnutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasGrafigDoughnutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasGrafigDoughnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
