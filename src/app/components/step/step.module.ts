import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularIbanModule } from 'angular-iban';


import { StepRoutingModule } from './step-routing.module';
import { StepComponent } from './step.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectDebitComponent } from './direct-debit/direct-debit.component';
import { DocumentsComponent } from './documents/documents.component';
import { ESignComponent } from './e-sign/e-sign.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { CreditCheckComponent } from './credit-check/credit-check.component';
import { EndOfCreditCheckComponent } from './end-of-credit-check/end-of-credit-check.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PersonalContactDetailComponent } from './credit-check/personal-contact-detail/personal-contact-detail.component'
import { AddressEmploymentComponent } from './credit-check/address-employment/address-employment.component';
import { AggrementComponent } from './credit-check/aggrement/aggrement.component'





@NgModule({
  declarations: [StepComponent,
    NavbarComponent,
    DirectDebitComponent,
    DocumentsComponent,
    ESignComponent,
    CreditCheckComponent,
    EndOfCreditCheckComponent,
    PersonalContactDetailComponent,
    AddressEmploymentComponent,
    AggrementComponent
  ],
  imports: [
    CommonModule,
    StepRoutingModule,
    AngularIbanModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class StepModule { }
