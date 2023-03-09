import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShellOverviewComponent } from './shell-overview.component';

describe('ShellOverviewComponent', () => {
  let component: ShellOverviewComponent;
  let fixture: ComponentFixture<ShellOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShellOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShellOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
