import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  directDebitUrl,
  creditCheckValuesUrl,
  creditCheckUrl,
  getCurrentQuoteUrl,
  submitDocumentsUrl
} from '../config/apiUrl';
import { DirectDebit } from '../models/directDebit';
import { Observable } from 'rxjs';
import {
  CreditCheckValues,
  creditCheck,
  personalDetails,
  employmentDetails
} from '../models/creditCheck';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  data: creditCheck
  personalDetails: personalDetails
  employmentDetails: employmentDetails

  constructor(private http: HttpClient) { }


  directDebit(data: string) {
    let directDebitValue: DirectDebit = new DirectDebit(data, 1);
    console.log(directDebitValue);

    return this.http.post(directDebitUrl, directDebitValue, { headers: this.getTokenHeader() });
  }
  creditCheckValues(): Observable<CreditCheckValues> {
    return this.http.get<CreditCheckValues>(creditCheckValuesUrl, { headers: this.getTokenHeader() });
  }

  getTokenHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
  }

  postCreditCheck() {
    this.personalDetails = JSON.parse(localStorage.getItem('personalDetails'));
    this.employmentDetails = JSON.parse(localStorage.getItem('address-Employment'));
    this.data = {
      PersonalDetails: this.personalDetails,
      EmploymentDetails: this.employmentDetails
    };
    console.log(this.data);
    return this.http.post(creditCheckUrl, this.data, { headers: this.getTokenHeader() });
  }

  getCurrentQuote() {
    return this.http.get(getCurrentQuoteUrl, { headers: this.getTokenHeader() });
  }

  postDocuments(drivingLicense: File, certificateOfResidence: File, identificationProof: File) {
    const formData: FormData = new FormData();
    formData.append('drivingLicense', drivingLicense, drivingLicense.name);
    formData.append('certificateOfResidence', certificateOfResidence, certificateOfResidence.name);
    formData.append('identificationProof', identificationProof, identificationProof.name);
    return this.http.post(submitDocumentsUrl, formData, { headers: this.getTokenHeader() });
  }

}
