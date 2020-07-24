import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aggrement',
  templateUrl: './aggrement.component.html',
  styleUrls: ['./aggrement.component.css']
})
export class AggrementComponent implements OnInit {

  @Output() childValue = new EventEmitter<boolean>();
  agreed: boolean = false;

  constructor() { }

  ngOnInit() {
    this.agreed = this.checkFormSubmittion();
  }

  onChange(){
    this.childValue.emit(this.agreed);
  }

  checkFormSubmittion(){
    if(localStorage.getItem('step1') != null){
      return true;
    }
    else return false;
  }
}
