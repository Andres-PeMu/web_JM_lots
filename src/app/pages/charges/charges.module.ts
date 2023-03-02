import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargesRoutingModule } from './charges-routing.module';
import { ChargesComponent } from './charges.component';


@NgModule({
  declarations: [ChargesComponent],
  imports: [
    CommonModule,
    ChargesRoutingModule
  ],
  exports:[ChargesComponent],
})
export class ChargesModule { }
