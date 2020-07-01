import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/account/register/register.component';
import { LoginComponent } from './components/account/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { ForbiddenComponent } from './components/shared/forbidden/forbidden.component';


const routes: Routes = [
  {
    path:'',
    redirectTo:'/login',pathMatch:'full'
  },
  {
    path : 'Home',canActivate:[AuthGuard],
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path : 'register',
    component: RegisterComponent
  },
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path : 'admin-dashboard', canActivate:[AuthGuard], data:{permittedRoles: ['Admin'] },
    component: AdminDashboardComponent
  },
  {
    path:'step',
    loadChildren: () => import('./components/step/step.module').then(m => m.StepModule)
  },
  {
    path : 'forbidden', 
    component: ForbiddenComponent
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
