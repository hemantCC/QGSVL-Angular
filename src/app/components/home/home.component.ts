import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dropDownValues: any[] = [];
  brands: string[] = [];
  fuelTypes: string[] = [];
  transmission: string[] = [];
  types: string[] = [];
  range: any[] = [
    { id: 1, value: '0-249' },
    { id: 2, value: '250-499' },
    { id: 3, value: '500-749' },
    { id: 4, value: '750-above' }]

  constructor(private router: Router,
    private toastr: ToastrService,
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.populateDropDown();
  }

  populateDropDown() {
    this.vehicleService.getVehicleFilters().subscribe((res: any) => {
      this.dropDownValues = res;
      console.log(this.dropDownValues);

      this.dropDownValues.map(values => {
        if (!this.brands.includes(values.brand)) {
          this.brands.push(values.brand);
        }
        if (!this.fuelTypes.includes(values.fuelType)) {
          this.fuelTypes.push(values.fuelType);
        }
        if (!this.types.includes(values.type)) {
          this.types.push(values.type);
        }
        if (!this.transmission.includes(values.transmission)) {
          this.transmission.push(values.transmission);
        }
      });
    },
      err => {
        console.error(err);
      })
  }


  logoutUser() {
    localStorage.removeItem('token');
    this.toastr.success('You have successfully logged out!', 'Logout Sucessfull');
    this.router.navigateByUrl('/account/login');
  }

  onSearch() {
    this.router.navigateByUrl('/filter');
  }


}
