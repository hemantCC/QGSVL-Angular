import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dropDownValues: any[] = [];
  filters: Filters = new Filters([], [], [], [], []);
  savedFilters: Filters = new Filters([], [], [], [], []);
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
    this.initializeSelectedFilters();
    
  }

  populateDropDown() {
    this.vehicleService.getVehicleFilters().subscribe((res: any) => {
      this.dropDownValues = res;
      console.log(this.dropDownValues);

      this.dropDownValues.map(values => {
        if (!this.filters.brands.includes(values.brand)) {
          this.filters.brands.push(values.brand);
        }
        if (!this.filters.fuelTypes.includes(values.fuelType)) {
          this.filters.fuelTypes.push(values.fuelType);
        }
        if (!this.filters.types.includes(values.type)) {
          this.filters.types.push(values.type);
        }
        if (!this.filters.transmission.includes(values.transmission)) {
          this.filters.transmission.push(values.transmission);
        }
      });
    },
      err => {
        console.error(err);
      })
  }

  initializeSelectedFilters() {
    if (JSON.parse(localStorage.getItem('selectedFilters')) == null) {
      this.savedFilters == new Filters([], [], [], [], []);
    }
    else {
      this.savedFilters = JSON.parse(localStorage.getItem('selectedFilters'));
    }
  }

  onFilterChange(category: string, param: any) {
    this.initializeSelectedFilters();
    switch (category) {
      case 'type': {
        const alreadyExists = this.savedFilters.types.includes(param);
        if (!alreadyExists) {
          this.savedFilters.types.push(param);
        }
        else {
          const index = this.savedFilters.types.indexOf(param);
          if (index > -1) {
            this.savedFilters.types.splice(index, 1);
          }
        }
        break;
      }
      case 'brand': {
        const alreadyExists = this.savedFilters.brands.includes(param);
        if (!alreadyExists) {
          this.savedFilters.brands.push(param);
        }
        else {
          const index = this.savedFilters.brands.indexOf(param);
          if (index > -1) {
            this.savedFilters.brands.splice(index, 1);
          }
        }
        break;
      }
      case 'fuelType': {
        const alreadyExists = this.savedFilters.fuelTypes.includes(param);
        if (!alreadyExists) {
          this.savedFilters.fuelTypes.push(param);
        }
        else {
          const index = this.savedFilters.fuelTypes.indexOf(param);
          if (index > -1) {
            this.savedFilters.fuelTypes.splice(index, 1);
          }
        }
        break;
      }
      case 'transmission': {
        const alreadyExists = this.savedFilters.transmission.includes(param);
        if (!alreadyExists) {
          this.savedFilters.transmission.push(param);
        }
        else {
          const index = this.savedFilters.transmission.indexOf(param);
          if (index > -1) {
            this.savedFilters.transmission.splice(index, 1);
          }
        }
        break;
      }
      case 'range': {
        const parameter = param.value;
        const alreadyExists = this.savedFilters.range.includes(parameter);
        if (!alreadyExists) {
          this.savedFilters.range.push(parameter);
        }
        else {
          const index = this.savedFilters.range.indexOf(parameter);
          if (index > -1) {
            this.savedFilters.range.splice(index, 1);
          }
        }
        break;
      }
    }
    localStorage.setItem('selectedFilters', JSON.stringify(this.savedFilters));
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
