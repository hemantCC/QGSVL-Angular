import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
