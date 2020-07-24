import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/account/login', pathMatch: 'full'
  },
  {
    path: 'Home', canActivate: [AuthGuard],
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'administrator', canActivate: [AuthGuard], data: { permittedRoles: ['Admin'] },
    loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./components/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'step', canActivate: [AuthGuard], data: { permittedRoles: ['User'] },
    loadChildren: () => import('./components/step/step.module').then(m => m.StepModule)
  },
  {
    path: 'forbidden',
    component: ForbiddenComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
