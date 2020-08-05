import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Router } from '@angular/router';
import { Filters } from 'src/app/models/filters';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  opened: boolean = false;
  vehicles: any[]
  filteredVehicles: any[]
  dropDownValues: any[] = [];

  filters: Filters = new Filters([], [], [], [], []);
  savedFilters: Filters = new Filters([], [], [], [], []);
  range: any[] = [
    { id: 1, value: '0-249' },
    { id: 2, value: '250-499' },
    { id: 3, value: '500-749' },
    { id: 4, value: '750-above' }]

  constructor(private vehicleService: VehicleService,
    private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  //initializes by getting all vehicle and filter data
  getData() {
    this.vehicleService.getVehicles().subscribe((res: any) => {
      this.vehicles = this.filteredVehicles = res;
      this.populateFilters(); //populate filters from vehicle details
      this.initializeSelectedFilters();
      this.filterVehicle();
      console.log(this.filteredVehicles);
    },
      (err) => {
        console.error(err);
      });
  }

  populateFilters() {
    this.vehicles.map(values => {
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
  }

  onVehicleSelection(id: number) {
    localStorage.setItem('selectedVehicle', id.toString());
    this.router.navigateByUrl('/vehicle-detail');
  }

  initializeSelectedFilters() {
    this.filteredVehicles = [];
    if (JSON.parse(localStorage.getItem('selectedFilters')) == null) {
      this.savedFilters == new Filters([], [], [], [], []);
      // this.filteredVehicles = this.vehicles; 
    }
    else {
      this.savedFilters = JSON.parse(localStorage.getItem('selectedFilters'));
      // this.filterVehicle();
    }
  }

  onFilter(category: string, param: any) {
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
        const alreadyExists = this.savedFilters.range.includes(param);
        if (!alreadyExists) {
          this.savedFilters.range.push(param);
        }
        else {
          const index = this.savedFilters.range.indexOf(param);
          if (index > -1) {
            this.savedFilters.range.splice(index, 1);
          }
        }
        break;
      }
    }
    localStorage.setItem('selectedFilters', JSON.stringify(this.savedFilters));
    console.log(JSON.parse(localStorage.getItem('selectedFilters')));

    this.filterVehicle();
  }

  filterVehicle() {
    this.vehicles?.filter((vehicle) => {
      const typeMatch = (this.savedFilters.types.length > 0 && this.savedFilters.types.includes(vehicle.type))
        || this.savedFilters.types.length == 0 ? true : false;
      const brandMatch = (this.savedFilters.brands.length > 0 && this.savedFilters.brands.includes(vehicle.brand))
        || this.savedFilters.brands.length == 0 ? true : false;
      const fuelTypeMatch = (this.savedFilters.fuelTypes.length > 0 && this.savedFilters.fuelTypes.includes(vehicle.fuelType))
        || this.savedFilters.fuelTypes.length == 0 ? true : false;
      const transmissionMatch = (this.savedFilters.transmission.length > 0 && this.savedFilters.transmission.includes(vehicle.transmission))
        || this.savedFilters.transmission.length == 0 ? true : false;
      const rangeMatch = (this.savedFilters.range?.length > 0 && this.inRange(vehicle.price))
        || this.savedFilters.range?.length == 0 ? true : false;
      if (typeMatch && brandMatch && fuelTypeMatch && transmissionMatch && rangeMatch) {
        this.filteredVehicles.push(vehicle);
      }
    })
    console.log(this.filteredVehicles);
    
  }

  inRange(value): boolean {
    var exists: Boolean = false;
    this.savedFilters.range.forEach((range) => {
      range = range.replace('above', 'Infinity')
      var arr = range.split('-')
      if (arr[0] <= value && value <= arr[1]) {
        exists = true
      }
    })
    return (exists) ? true : false
  }

  onResetFilters(){
    localStorage.removeItem('selectedFilters');
    this.savedFilters = new Filters([],[],[],[],[]);
    this.filteredVehicles = this.vehicles;
  }

}