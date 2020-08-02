import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';

@Component({
  selector: 'app-user-quotes',
  templateUrl: './user-quotes.component.html',
  styleUrls: ['./user-quotes.component.css']
})
export class UserQuotesComponent implements OnInit {

  quotes: any = [];
  // car:any = [];


  constructor(private quote: QuoteService) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quote.getUserQuotes().subscribe((res: any) => {
      this.quotes = res;
      // this.car = res.car;
      console.log(this.quotes);
    },
      err => {
        console.error(err);
      })
  }

}
