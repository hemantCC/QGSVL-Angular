import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';
import { dropDownValues } from 'src/app/models/creditCheck';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any; // ADD THIS
import * as $ from 'jquery';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User('','','','', null,'','');

  data: dropDownValues[] = [
    { id: 0, name: 'Mr.' },
    { id: 1, name: 'Mrs.' },
    { id: 2, name: 'Ms.' },
    { id: 3, name: 'Dr.' }
  ];
  seePassword: boolean = false;

  constructor(private accountService: AccountService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    $('[data-toggle="popover"]').popover({
      trigger: 'focus'
    });
  }

  formSubmit(form: NgForm) {
    this.spinner.show();
    this.accountService.registerUser(form.value).subscribe(
      (res: any) => {
        this.spinner.hide();
        this.toastr.success('You have successfully Registered!', 'Registration Sucessfull');
      },
      error => {
        this.spinner.hide();
        this.toastr.error('Something went wrong', 'Registration Failed');
        console.log(error);
      }
    );
  }

}
