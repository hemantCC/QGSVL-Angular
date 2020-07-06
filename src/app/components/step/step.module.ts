import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularIbanModule } from 'angular-iban';


import { StepRoutingModule } from './step-routing.module';
import { StepComponent } from './step.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { DirectDebitComponent } from './direct-debit/direct-debit.component';
import { DocumentsComponent } from './documents/documents.component';
import { ESignComponent } from './e-sign/e-sign.component';



@NgModule({
  declarations: [StepComponent,
    NavbarComponent,
    DirectDebitComponent,
    DocumentsComponent,
    ESignComponent],
  imports: [
    CommonModule,
    StepRoutingModule,
    AngularIbanModule,
    FormsModule,

  ]
})
export class StepModule { }
