import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectorsRoutingModule } from './sectors-routing.module';
import { SectorsComponent } from './sectors.component';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';


@NgModule({
  declarations: [SectorsComponent, NavComponent],
  imports: [
    CommonModule,
    SectorsRoutingModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  exports: [SectorsComponent]
})
export class SectorsModule { }
