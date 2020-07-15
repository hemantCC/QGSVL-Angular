import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { directDebitUrl, creditCheckValuesUrl } from '../config/apiUrl';
import { DirectDebit } from '../models/directDebit';
import { Observable } from 'rxjs';
import { CreditCheckValues, creditCheck, personalDetails, employmentDetails } from '../models/creditCheck';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  data: creditCheck
  personalDetails: personalDetails
  employmentDetails: employmentDetails

  constructor(private http: HttpClient) { }
  

  directDebit(data: DirectDebit) {
    return this.http.post(directDebitUrl, data, { headers: this.getTokenHeader() });
  }
  creditCheckValues(): Observable<CreditCheckValues> {
    return this.http.get<CreditCheckValues>(creditCheckValuesUrl, { headers: this.getTokenHeader() });
  }

  getTokenHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
  }

  postCreditCheck(){
    this.personalDetails = JSON.parse(localStorage.getItem('personalDetails'));
    this.employmentDetails = JSON.parse(localStorage.getItem('address-Employment'));
    this.data = {
      PersonalDetails: this.personalDetails,
      EmploymentDetails: this.employmentDetails
    }
    console.log(this.data);
    return this.http.post('',this.data,{ headers: this.getTokenHeader() });
  }

}
