import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PrivateLeaseComponent } from './private-lease/private-lease.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NavbarComponent, PrivateLeaseComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [NavbarComponent]
})
export class SharedModule { }
