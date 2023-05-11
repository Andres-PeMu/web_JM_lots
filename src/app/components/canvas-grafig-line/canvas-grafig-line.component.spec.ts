import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasGrafigLineComponent } from './canvas-grafig-line.component';

describe('CanvasGrafigLineComponent', () => {
  let component: CanvasGrafigLineComponent;
  let fixture: ComponentFixture<CanvasGrafigLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CanvasGrafigLineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CanvasGrafigLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
