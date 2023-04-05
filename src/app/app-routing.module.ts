import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sectors',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sectors',
    loadChildren: () => import('./pages/sectors/sectors.module').then(m => m.SectorsModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'charges',
    loadChildren: () => import('./pages/charges/charges.module').then(m => m.ChargesModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule),
    canActivate: [AuthGuardGuard]
  },
  {
    path: '**',
    redirectTo: 'sectors',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
