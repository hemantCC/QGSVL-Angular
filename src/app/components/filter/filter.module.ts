import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { FilterComponent } from './filter.component';
import { FilterRoutingModule } from './filter-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatChipsModule } from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FilterRoutingModule,
    MatSidenavModule,
    NgxSpinnerModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class FilterModule { }
