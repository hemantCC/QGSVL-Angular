import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { NgForm } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  statuses: any;
  editStatus: number;
  selectedStatus: string = '';
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'vehicle', 'rentDate', 'paybackTime', 'Mileage', 'totalPrice', 'status', 'Edit'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.populateDropdown();
    this.getAllQuotes();
  }

  populateDropdown() {
    this.adminService.getAllQuoteStatus().subscribe(
      (res) => {
        this.statuses = res;
      },
      err => {
        console.log(err);
      }
    )
  }

  getAllQuotes() {
    this.adminService.getAllQuotes().subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res);
      console.log(res);
      
      this.dataSource.sort = this.sort; 
      this.dataSource.paginator = this.paginator
    },
      err => {
        console.log(err);
      });
  }

  onEdit(quoteId: number) {
    this.editStatus = null;
    this.adminService.editStatus(quoteId, this.selectedStatus).subscribe((res) => {
      this.ngOnInit();
    },
      err => {
        console.log(err);
        this.ngOnInit();
      });
      
  }

}
