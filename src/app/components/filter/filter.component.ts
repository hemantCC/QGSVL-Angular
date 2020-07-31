import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  opened: boolean = false;
  vehicles: any[]
  dropDownValues: any[] = [];
  brands: string[] = [];
  fuelTypes: string[] = [];
  transmission: string[] = [];
  types: string[] = [];
  range: any[] = [
    { id: 1, value: 'under  349' },
    { id: 2, value: '350 - 599' },
    { id: 3, value: '600 - 849' },
    { id: 4, value: '850 - 1087' },
    { id: 5, value: 'above  1088' }]

  constructor(private vehicleService: VehicleService,
    private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  //initializes by getting all vehicle and filter data
  getData() {
    this.vehicleService.getVehicles().subscribe((res: any) => {
      this.vehicles = res;
      this.populateFilters(); //populate filters from vehicle details
      console.log(this.vehicles);
    },
      (err) => {
        console.error(err);
      });
  }
  
  populateFilters(){
    this.vehicles.map(values => {
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
  }
  
  onVehicleSelection(id: number) {
    localStorage.setItem('selectedVehicle',id.toString());
    this.router.navigateByUrl('/vehicle-detail');
  }
}