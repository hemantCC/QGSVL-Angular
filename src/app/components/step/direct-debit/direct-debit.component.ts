import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-direct-debit',
  templateUrl: './direct-debit.component.html',
  styleUrls: ['./direct-debit.component.css']
})
export class DirectDebitComponent implements OnInit {

  ibanNumber: string;
  constructor() { }

  ngOnInit() {
  }

}
