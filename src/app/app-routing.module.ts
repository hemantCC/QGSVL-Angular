import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';
import { UserQuotesComponent } from './components/user-quotes/user-quotes.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/Home', pathMatch: 'full'
  },
  {
    path: 'Home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./components/filter/filter.module').then(m => m.FilterModule)
  },
  {
    path: 'vehicle-detail',
    loadChildren: () => import('./components/vehicle-detail/vehicle-detail.module').then(m => m.VehicleDetailModule)
  },
  {
    path: 'user-quotes', canActivate: [AuthGuard], data: { permittedRoles: ['User'] },
    component: UserQuotesComponent
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
