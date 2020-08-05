import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { getUserQuotesUrl } from '../config/apiUrl';
import { generateQuoteUrl } from '../config/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  getUserQuotes() {
    return this.http.get(getUserQuotesUrl);
  }

  generateQuote(data: any) {
    return this.http.post(generateQuoteUrl, data)
  }

}
