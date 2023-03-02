import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpeExpensesComponent } from './ope-expenses.component';

const routes: Routes = [
  {
    path:'',
    component: OpeExpensesComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpeExpensesRoutingModule { }
