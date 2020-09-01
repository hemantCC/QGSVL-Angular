import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  directDebitUrl,
  creditCheckValuesUrl,
  creditCheckUrl,
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

    return this.http.post(directDebitUrl, directDebitValue);
  }
  creditCheckValues(): Observable<CreditCheckValues> {
    return this.http.get<CreditCheckValues>(creditCheckValuesUrl);
  }

  postCreditCheck() {
    this.personalDetails = JSON.parse(localStorage.getItem('personalDetails'));
    this.employmentDetails = JSON.parse(localStorage.getItem('address-Employment'));
    this.data = {
      PersonalDetails: this.personalDetails,
      EmploymentDetails: this.employmentDetails
    };
    console.log(this.data);
    return this.http.post(creditCheckUrl, this.data);
  }

  postDocuments(drivingLicense: File, certificateOfResidence: File, identificationProof: File) {
    var quoteId = JSON.parse(localStorage.getItem('currentQuote')).id;
    const formData: FormData = new FormData();
    formData.append('drivingLicense', drivingLicense, drivingLicense.name);
    formData.append('certificateOfResidence', certificateOfResidence, certificateOfResidence.name);
    formData.append('identificationProof', identificationProof, identificationProof.name);
    formData.append('quoteId', quoteId);
    return this.http.post(submitDocumentsUrl, formData);
  }

}
