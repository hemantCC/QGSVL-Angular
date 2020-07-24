import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getAllQuoteStatusUrl, getAllQuotesUrl } from '../config/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllQuoteStatus() {
    return this.http.get(getAllQuoteStatusUrl,{ headers: this.getTokenHeader() });
  }

  getAllQuotes(){
    return this.http.get(getAllQuotesUrl,{ headers: this.getTokenHeader() });
  }

  getTokenHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
  }

}