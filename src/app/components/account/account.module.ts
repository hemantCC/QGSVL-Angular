import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [LoginComponent,
    RegisterComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),

  ]
})
export class AccountModule { }
