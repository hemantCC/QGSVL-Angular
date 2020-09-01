import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  returnUrl: string;

  constructor(private accountService: AccountService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.router.navigate(['/Home']);
    }
  }

  formSubmit(form: NgForm) {
    this.spinner.show();
    this.accountService.loginUser(form.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.spinner.hide();
        this.toastr.success('You have successfully logged in !', 'Login Sucessfull');
        //check role
        var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        var userRole = payLoad.role;
        if (userRole == 'Admin') {
          this.router.navigateByUrl('/administrator/dashboard');
        }
        else {
          if (JSON.parse(localStorage.getItem('selectedFilters')) != null){
            localStorage.removeItem('selectedFilters');
          }
          this.router.navigateByUrl('/Home');
        }
      },
      error => {
        this.toastr.error('Username or password incorrect!', 'Login Fail!');
        this.spinner.hide();
        console.log(error)
      }
    );
  }

}
