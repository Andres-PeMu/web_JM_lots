import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sectors',
    pathMatch: 'full'
  },
  {
    path: 'sectors',
    loadChildren: () => import('./pages/sectors/sectors.module').then(m => m.SectorsModule)
  },
  {
    path: 'charges',
    loadChildren: () => import('./pages/charges/charges.module').then(m => m.ChargesModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./pages/customer/customers.module').then(m => m.CustomersModule)
  },
  {
    path: 'lots',
    loadChildren: () => import('./pages/lots/lost.module').then(m => m.LostModule)
  },
  {
    path: 'oe',
    loadChildren: () => import('./pages/ope-expenses/ope-expenses.module').then(m => m.OpeExpensesModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./pages/payments/payments.module').then(m => m.PaymentsModule)
  },
  {
    path: 'sales',
    loadChildren: () => import('./pages/sales/sales.module').then(m => m.SalesModule)
  },
  {
    path: 'workers',
    loadChildren: () => import('./pages/workers/workers.module').then(m => m.WorkersModule)
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
