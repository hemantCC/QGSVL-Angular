import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-e-sign',
  templateUrl: './e-sign.component.html',
  styleUrls: ['./e-sign.component.css']
})
export class ESignComponent implements OnInit {

  constructor(private stepper: MatStepper) { }

  ngOnInit() {
  }

  onFinish(){
    this.stepper.selected.completed = true;
    localStorage.setItem('step5', 'completed');
  }

}
