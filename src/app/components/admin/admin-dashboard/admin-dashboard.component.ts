import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  statuses: any;
  quotes: any;
  editStatus: boolean = false;
  selectedStatus: string = '';

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.populateDropdown();
    this.getAllQuotes();
  }

  populateDropdown() {
    this.adminService.getAllQuoteStatus().subscribe(
      (res) => {
        this.statuses = res;
        console.log(res);

      },
      err => {
        console.log(err);
      }
    )
  }

  getAllQuotes() {
    this.adminService.getAllQuotes().subscribe((res) => {
      this.quotes = res;
    },
      err => {
        console.log(err);
      });
  }

  onEdit(quoteId: number) {
    this.editStatus = !this.editStatus;
    console.log(this.selectedStatus + quoteId);
  }

}
