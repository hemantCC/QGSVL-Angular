import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    Email: '',
    Password: ''
  };
  seePassword: boolean = false;

  constructor(private accountService: AccountService,
     private router: Router,
     private toastr: ToastrService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/Home']);
    }
  }

  formSubmit(form: NgForm) {
    this.accountService.loginUser(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.toastr.success('You have successfully logged in !','Login Sucessfull');
        this.router.navigateByUrl('/Home');
      },
      error => {
        this.toastr.error('Username or password incorrect!','Login Fail!');
        console.log(error)
      }
    );
  }

}
