import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  logoutUser() {
    localStorage.removeItem('token');
    this.toastr.success('You have successfully logged out!', 'Logout Sucessfull');
    this.router.navigateByUrl('/account/login');
  }

}
