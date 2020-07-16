import { Component, OnInit } from '@angular/core';
import { StepService } from 'src/app/services/step.service';
import { CreditCheckValues, dropDownValues } from 'src/app/models/creditCheck';
import { FormGroup, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { PersonalDetail } from 'src/app/models/personalDetail';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-credit-check',
  templateUrl: './credit-check.component.html',
  styleUrls: ['./credit-check.component.css']
})
export class CreditCheckComponent implements OnInit {

  allValues: CreditCheckValues
  personalDetail : PersonalDetail
  
  constructor(private stepService: StepService,
    private router: Router,
    private toastr: ToastrService) {}

  ngOnInit() {
    this.populateDropDown();
  }

  populateDropDown() {
    this.stepService.creditCheckValues().subscribe((res: CreditCheckValues) => {
      this.allValues = res
      console.log(this.allValues);
    },
      (err) => {
        console.log(err);
      });
  }

  onContinue(){
    this.stepService.postCreditCheck().subscribe(
      (res) => {
          this.router.navigate['/step/EndOfCreditCheck'];
          this.toastr.success('','Step-1 Completed!');
        },
        (err) => {
          console.log(err);
          this.toastr.error('Please Try again.','Step-1 Failed!');
        }
    );
  }


}
