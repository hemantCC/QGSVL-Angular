import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDetailRoutingModule } from './vehicle-detail-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [VehicleDetailComponent],
  imports: [
    CommonModule,
    VehicleDetailRoutingModule,
    SharedModule,
    FormsModule,
    BsDatepickerModule
  ]
})
export class VehicleDetailModule { }  
