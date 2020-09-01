import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userExist: boolean = false;
  isAdmin: boolean = false;

  constructor(private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
   this.checkUser();
  }

  checkUser(){
    if (localStorage.getItem('token') != null) {
      this.userExist = true;
      var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      var userRole = payLoad.role;
      if (userRole == 'Admin') {
        this.isAdmin = true;
      }
    }
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.toastr.success('You have successfully logged out!', 'Logout Sucessfull');
    if (JSON.parse(localStorage.getItem('selectedFilters')) != null){
      localStorage.removeItem('selectedFilters');
    }
    this.router.navigateByUrl('/Home');
  }

}
