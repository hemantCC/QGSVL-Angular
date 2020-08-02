import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getUserQuotesUrl } from '../config/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  getUserQuotes() {
    return this.http.get(getUserQuotesUrl, { headers: this.getTokenHeader() });
  }

  getTokenHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
  }

}
