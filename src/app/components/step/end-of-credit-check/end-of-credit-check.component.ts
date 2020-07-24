import { Component, OnInit } from '@angular/core';
import { StepService } from 'src/app/services/step.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-end-of-credit-check',
  templateUrl: './end-of-credit-check.component.html',
  styleUrls: ['./end-of-credit-check.component.css']
})
export class EndOfCreditCheckComponent implements OnInit {

  quoteDetails: any = ('')
  constructor(private stepService: StepService,
    private stepper: MatStepper) { }

  ngOnInit() {
    this.stepService.getCurrentQuote().subscribe(
      (res) =>{
        this.quoteDetails = res;
        console.log(this.quoteDetails);
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  onContinue(){
    this.stepper.selected.completed = true;
    localStorage.setItem('step2', 'completed');
    this.stepper.next();
  }

}
