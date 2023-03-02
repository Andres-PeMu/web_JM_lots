import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpeExpensesRoutingModule } from './ope-expenses-routing.module';
import { OpeExpensesComponent } from './ope-expenses.component';


@NgModule({
  declarations: [OpeExpensesComponent],
  imports: [
    CommonModule,
    OpeExpensesRoutingModule
  ],
  exports:[OpeExpensesComponent],
})
export class OpeExpensesModule { }
