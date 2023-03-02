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
  // {
  //   path: 'validarEmail',
  //   loadChildren: () => import('./components/check-mail/check-mail.module').then(m => m.CheckMailModule)
  // },
  // {
  //   path: 'recuperarContraseña',
  //   loadChildren: () => import('./pages/recover-password/recover-password.module').then(m => m.RecoverPasswordComponentModule)
  // },
  // {
  //   path: 'registrarUsuario',
  //   loadChildren: () => import('./pages/registerUser/register-user.module').then(m => m.RegisterUserComponentModule)
  // },
  // {
  //   path: 'tab0',
  //   loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  // },
  // {
  //   path: '**',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
