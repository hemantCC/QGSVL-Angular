import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './filter.component';
import { FilterRoutingModule } from './filter-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';



@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FilterRoutingModule,
    MatSidenavModule
  ]
})
export class FilterModule { }
