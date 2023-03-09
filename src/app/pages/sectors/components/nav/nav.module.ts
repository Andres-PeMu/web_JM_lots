import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavRoutingModule } from './nav-routing.module';
import { NavComponent } from './nav.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [NavComponent],
  imports: [
    CommonModule,
    NavRoutingModule,
    MatButtonModule
  ],
  exports: [NavComponent]
})
export class NavModule { }
