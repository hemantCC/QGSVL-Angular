import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDetailRoutingModule } from './vehicle-detail-routing.module';
import { SharedModule } from '../shared/shared.module';
import { VehicleDetailComponent } from './vehicle-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [VehicleDetailComponent,
  ViewQuotationComponent],
  imports: [
    CommonModule,
    VehicleDetailRoutingModule,
    SharedModule,
    FormsModule,
    BsDatepickerModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class VehicleDetailModule { }  
