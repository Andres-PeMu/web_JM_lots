import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellOverviewLotsComponent } from './shell-overview-lots.component';

describe('ShellOverviewLotsComponent', () => {
  let component: ShellOverviewLotsComponent;
  let fixture: ComponentFixture<ShellOverviewLotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellOverviewLotsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellOverviewLotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
