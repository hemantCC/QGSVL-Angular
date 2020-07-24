import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {

  step1Completed: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;
  step4Completed: boolean = false;
  step5Completed: boolean = false;

  constructor() { }

  ngOnInit() {
    this.checkStepCompleted();
  }

  checkStepCompleted() {
    if (localStorage.getItem('step1') != null) {
      this.step1Completed = true;
    }
    if (localStorage.getItem('step2') != null) {
      this.step2Completed = true;
    } 
    if (localStorage.getItem('step3') != null) {
      this.step3Completed = true;
    } 
    if (localStorage.getItem('step4') != null) {
      this.step4Completed = true;
    }
    if (localStorage.getItem('step5') != null) {
      this.step5Completed = true;
    }

  }
}
