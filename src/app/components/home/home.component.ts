import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.toastr.success('You have successfully logged out!','Logout Sucessfull');
    this.router.navigateByUrl('/account/login');
  }

}
