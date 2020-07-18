import { Component, OnInit, ViewChild } from '@angular/core';
import { StepService } from 'src/app/services/step.service';
import { CreditCheckValues, dropDownValues } from 'src/app/models/creditCheck';
import { FormGroup, FormControl, NgForm, FormBuilder } from '@angular/forms';
import { PersonalDetail } from 'src/app/models/personalDetail';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AggrementComponent } from './aggrement/aggrement.component';


@Component({
  selector: 'app-credit-check',
  templateUrl: './credit-check.component.html',
  styleUrls: ['./credit-check.component.css']
})
export class CreditCheckComponent implements OnInit {

  allValues: CreditCheckValues
  personalDetail: PersonalDetail
  @ViewChild(AggrementComponent) child;
  aggreed: boolean = false;
  ok: boolean = false;

  constructor(private stepService: StepService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.populateDropDown();
    this.aggreed =  this.checkFormSubmittion();
    if(this.checkFormSubmittion() && localStorage.getItem('personalDetails') != null && localStorage.getItem('address-Employment') != null ){
      this.ok = true
    }
  }

  //gets checkbox value on chanhe from agreement
  fetchValueFromChild(childValue: boolean) {
    if (localStorage.getItem('personalDetails') != null && localStorage.getItem('address-Employment') != null) {
      this.ok = true;
    }
    this.aggreed = childValue;
  }

  checkFormSubmittion(){
    if(localStorage.getItem('formSubmitted') == '1'){
      return true;
    }
    else return false;
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

  onContinue() {
    this.stepService.postCreditCheck().subscribe(
      (res) => {
        localStorage.setItem('formSubmitted','1');
        this.router.navigateByUrl('/step/EndOfCreditCheck');
        this.toastr.success('', 'Step-1 Completed!');
      },
      (err) => {
        console.log(err);
        this.toastr.error('Please Try again.', 'Step-1 Failed!');
      }
    );
  }


}
