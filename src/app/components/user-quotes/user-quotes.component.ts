import { Component, OnInit } from '@angular/core';
import { QuoteService } from 'src/app/services/quote.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-quotes',
  templateUrl: './user-quotes.component.html',
  styleUrls: ['./user-quotes.component.css']
})
export class UserQuotesComponent implements OnInit {

  quotes: any = [];
  quotesSubscriptions: Subscription;


  constructor(private quote: QuoteService) { }

  ngOnInit() {
    this.getQuotes();
  }

  getQuotes() {
    this.quotesSubscriptions = this.quote.getUserQuotes().subscribe((res: any) => {
      this.quotes = res;
      console.log(this.quotes);
    },
      err => {
        console.error(err);
      })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.quotesSubscriptions.unsubscribe();
  }

}
