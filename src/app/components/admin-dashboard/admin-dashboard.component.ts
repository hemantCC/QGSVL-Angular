import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

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
