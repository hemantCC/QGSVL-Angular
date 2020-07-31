import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getVehiclesUrl, getVehicleFiltersUrl, getVehicleUrl } from '../config/apiUrl';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  getVehicleFilters(): Observable<any> {
    return this.http.get(getVehicleFiltersUrl);
  }

  getVehicles() {
    return this.http.get(getVehiclesUrl);
  }
  
  getVehicleById(id){
    return this.http.get(getVehicleUrl + '?id=' + id);
  }
}
