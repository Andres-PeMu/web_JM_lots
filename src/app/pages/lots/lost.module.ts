import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LostRoutingModule } from './lost-routing.module';
import { LotsComponent } from './lots.component';


@NgModule({
  declarations: [LotsComponent],
  imports: [
    CommonModule,
    LostRoutingModule
  ],
  exports:[LotsComponent],
})
export class LostModule { }
