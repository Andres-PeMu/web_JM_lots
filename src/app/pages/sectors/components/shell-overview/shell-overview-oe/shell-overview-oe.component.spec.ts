import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellOverviewOEComponent } from './shell-overview-oe.component';

describe('ShellOverviewOEComponent', () => {
  let component: ShellOverviewOEComponent;
  let fixture: ComponentFixture<ShellOverviewOEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellOverviewOEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellOverviewOEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
