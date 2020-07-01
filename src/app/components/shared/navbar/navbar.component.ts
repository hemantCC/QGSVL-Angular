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

  constructor(private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('token') != null) {
      this.userExist = true;
    }
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.toastr.success('You have successfully logged out!', 'Logout Sucessfull');
    this.router.navigateByUrl('/login');
  }

}
