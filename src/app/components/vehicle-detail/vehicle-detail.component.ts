import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRipple } from '@angular/material/core';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.css']
})
export class VehicleDetailComponent implements OnInit {

  vehicle: any = [];
  mainEquipments: string[] = [];
  standardEquipments: string[] = [];
  includedServices: string[] = [];
  paybackTime: number = 24
  mileage: number = 10000
  prefix: any[] = [
    { id: 0, name: 'Mr.' },
    { id: 1, name: 'Mrs.' },
    { id: 2, name: 'Ms.' },
    { id: 3, name: 'Dr.' }
  ];

  vehicleDetailForm: FormGroup;

  constructor(private vehicleService: VehicleService,
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder) {
    this.vehicleDetailForm = formBuilder.group({
      paybackTime: [''],
      mileage: [''],
      isMainDriver: [''],
      prefix: [''],
      firstName: [''],
      lastName: [''],
      dateOfBirth: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.initializeData();
    this.vehicleDetailForm.patchValue({
      paybackTime: 24,
      mileage: 10,
      isMainDriver: 'true',
      // prefix: 'Mr.'
    })
  }

  changePaybackTime(event) {
    console.log(event.target.value);
    this.paybackTime = event.target.value;

  }

  changeMileage(event) {
    console.log(event.target.value * 1000);
    this.mileage = event.target.value * 1000;
  }

  initializeData() {
    let id = localStorage.getItem('selectedVehicle');
    if (id == null) {
      alert('please select a vehicle to proceed!');
      this.router.navigateByUrl('/filter');
    }
    else {
      this.vehicleService.getVehicleById(id).subscribe((res: any) => {
        console.log(res);
        this.vehicle = res.vehicle;
        this.mainEquipments = res.mainEquipments;
        this.standardEquipments = res.standardEquipments;
        this.includedServices = res.includedServices;
      },
        err => {
          console.error(err);
        });
    }
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    let dialogObj = this.dialog.open(ViewQuotationComponent, {
      data: { vehicle: this.vehicle, paybackTime: this.vehicleDetailForm.value.paybackTime ,
      mileage: this.vehicleDetailForm.value.mileage }
      , disableClose: true, autoFocus: true
    });


    dialogObj.afterClosed().subscribe(result => {
      if (result == 'false') {
        if (this.userLoggedin()) {
          this.toastr.success('After approval you may proceed!', 'Order Request sent');
          console.log(this.vehicleDetailForm.value);

          this.router.navigateByUrl('/user-quotes');
        }
        else {
          this.toastr.warning('You need to be logged in to continue process.', 'Please Login!');
        }
      }
    })
  }

  userLoggedin(): Boolean {
    return (localStorage.getItem('token') != null) ? true : false;
  }


}
