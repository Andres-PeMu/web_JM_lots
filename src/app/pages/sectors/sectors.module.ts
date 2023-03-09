import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ShellOverviewComponent } from './components/shell-overview/shell-overview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavModule } from './components/nav/nav.module';
import { NewSectorModule } from './components/new-sector/new-sector.module';
import { CardSectorModule } from './components/card-sector/card-sector.module';
import { LotsComponent } from './components/lots/lots.component';



@NgModule({
  declarations: [SectorsComponent, ShellOverviewComponent, LotsComponent],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    NavModule,
    NewSectorModule,
    CardSectorModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [SectorsComponent]
})
export class SectorsModule { }
