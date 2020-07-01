import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularIbanModule } from 'angular-iban';


import { StepRoutingModule } from './step-routing.module';
import { StepComponent } from './step.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [StepComponent,
  NavbarComponent],
  imports: [
    CommonModule,
    StepRoutingModule,
    AngularIbanModule,
    FormsModule,

  ]
})
export class StepModule { }
