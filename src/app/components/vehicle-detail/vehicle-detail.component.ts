import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuoteService } from 'src/app/services/quote.service';

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
  totalPrice: number = this.vehicle?.price + (this.paybackTime / 12) * 1000 + (this.mileage / 5000) * 200;
  prefix: any[] = [
    { id: 0, name: 'Mr.' },
    { id: 1, name: 'Mrs.' },
    { id: 2, name: 'Ms.' },
    { id: 3, name: 'Dr.' }
  ];
  vehicleDetailForm: FormGroup;
  formSubmitted: boolean = false;


  constructor(private vehicleService: VehicleService,
    private quoteService: QuoteService,
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
    this.onReload();
  }

  onReload() {
    if (JSON.parse(localStorage.getItem('vehicleDetailsForm')) != null) {
      let data = JSON.parse(localStorage.getItem('vehicleDetailsForm'));
      this.vehicleDetailForm.patchValue({
        paybackTime: data.paybackTime,
        mileage: data.mileage,
        isMainDriver: data.isMainDriver,
        prefix: data.prefix,
        firstName: data.firstName,
        lastName: data.lastName,
        dateOfBirth: data.dateOfBirth
      })
      this.formSubmitted = true;
    }
    else {
      this.vehicleDetailForm.patchValue({
        paybackTime: 24,
        mileage: 10,
        isMainDriver: 'true',
      })
    }
  }

  changePaybackTime(event) {
    console.log(event.target.value);
    this.paybackTime = event.target.value;
    this.totalPrice = this.vehicle?.price + (this.paybackTime / 12) * 1000 + (this.mileage / 5000) * 200;
  }

  changeMileage(event) {
    console.log(event.target.value * 1000);
    this.mileage = event.target.value * 1000;
    this.totalPrice = this.vehicle?.price + (this.paybackTime / 12) * 1000 + (this.mileage / 5000) * 200;
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
        this.totalPrice = this.vehicle?.price + (this.paybackTime / 12) * 1000 + (this.mileage / 5000) * 200;
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
    dialogConfig.data = {
      vehicle: this.vehicle, paybackTime: this.vehicleDetailForm.value.paybackTime,
      mileage: this.vehicleDetailForm.value.mileage,
      totalPrice: this.totalPrice
    };
    dialogConfig.autoFocus = true;
    dialogConfig.height = "80%"

    let dialogObj = this.dialog.open(ViewQuotationComponent, dialogConfig);


    dialogObj.afterClosed().subscribe(result => {
      if (result == 'false') {
        if (this.userLoggedin()) {
          let data = {
            dateOfBirth: this.vehicleDetailForm.value.dateOfBirth,
            firstName: this.vehicleDetailForm.value.firstName,
            lastName: this.vehicleDetailForm.value.lastName,
            isMainDriver: this.vehicleDetailForm.value.isMainDriver,
            mileage: this.vehicleDetailForm.value.mileage,
            paybackTime: this.vehicleDetailForm.value.paybackTime,
            prefix: this.vehicleDetailForm.value.prefix,
            total: this.totalPrice,
            selectedVehicle: localStorage.getItem('selectedVehicle')
          }
          this.quoteService.generateQuote(data).subscribe((res) => {
            console.log(res);
            localStorage.setItem('currentQuote',JSON.stringify(res));
            this.toastr.success('After approval you may proceed!', 'Order Request sent');
            localStorage.setItem('vehicleDetailsForm', JSON.stringify(data));
            this.formSubmitted = true
            this.router.navigateByUrl('/user-quotes');
          },
            err => {
              this.toastr.error('Please try again.', 'Something went wrong!')
              console.error(err);

            })
        }
        else {
          this.toastr.warning('You need to be logged in to continue process.', 'Please Login!');
          this.router.navigateByUrl('/account/login');
        }
      }
    })
  }

  userLoggedin(): Boolean {
    return (localStorage.getItem('token') != null) ? true : false;
  }

  onChangeDriver(){
    this.vehicleDetailForm.patchValue({
      prefix : '',
      firstName : '',
      lastName: '',
      dateOfBirth:''
    });
    this.vehicleDetailForm.markAsUntouched();
  }


}
