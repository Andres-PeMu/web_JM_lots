import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShellOverviewComponent } from './components/shell-overview-sector/shell-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavModule } from './components/nav/nav.module';
import { NewSectorModule } from './components/new-sector/new-sector.module';
import { ShellOverviewOEComponent } from './components/shell-overview-oe/shell-overview-oe.component';




@NgModule({
  declarations: [SectorsComponent, ShellOverviewComponent, ShellOverviewOEComponent ],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    NavModule,
    NewSectorModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [SectorsComponent]
})
export class SectorsModule { }
