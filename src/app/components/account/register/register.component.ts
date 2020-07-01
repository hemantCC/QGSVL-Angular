import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User('');

  data: Array<Object> = [
    { id: 0, name: 'Mr.' },
    { id: 1, name: 'Mrs.' },
    { id: 2, name: 'Ms.' },
    { id: 3, name: 'Dr.' }
  ];
  seePassword: boolean = false;

  constructor(private accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  formSubmit(form: NgForm) {
    this.accountService.registerUser(form.value).subscribe(
      (res: any) => {
        this.toastr.success('You have successfully Registered!', 'Registration Sucessfull');
      },
      error => {
        this.toastr.error('Something went wrong', 'Registration Failed');
        console.log(error);
      }
    );
  }

  selected() {
  }

}
