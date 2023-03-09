import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectorsComponent } from './sectors.component';

const routes: Routes = [
  {
    path:'',
    component: SectorsComponent,
  },
  {
    path:':name',
    loadChildren: () => import('./components/nav/nav.module').then(m => m.NavModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SectorsRoutingModule { }
