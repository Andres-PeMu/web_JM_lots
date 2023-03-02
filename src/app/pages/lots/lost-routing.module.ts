import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LotsComponent } from './lots.component';

const routes: Routes = [
  {
    path:'',
    component: LotsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LostRoutingModule { }
