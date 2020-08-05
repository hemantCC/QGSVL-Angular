import { Component, OnInit } from '@angular/core';
import { StepService } from 'src/app/services/step.service';
import { ToastrService } from 'ngx-toastr';
import { DirectDebit } from 'src/app/models/directDebit';
import { MatStepper } from '@angular/material/stepper';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-debit',
  templateUrl: './direct-debit.component.html',
  styleUrls: ['./direct-debit.component.css']
})
export class DirectDebitComponent implements OnInit {

  ibanNumber: string = null;
  formSaved: boolean = false;

  constructor(private stepService: StepService,
    private toastr: ToastrService,
    private stepper: MatStepper) { }

  ngOnInit() {
    if (localStorage.getItem('iban') != null) {
      this.ibanNumber = localStorage.getItem('iban');
      this.formSaved = true;
    }
  }

  onSave() {
    localStorage.setItem('iban', this.ibanNumber);
    this.formSaved = true;
    this.toastr.success('', 'Saved Sucessfully');
  }

  onContinue() {
    this.stepService.directDebit(this.ibanNumber).subscribe(
      (res: any) => {
        this.toastr.success('', 'Step 3 Complete!');
        this.stepper.selected.completed = true;
        localStorage.setItem('step3', 'completed');
        this.stepper.next();
      },
      err => {
        console.log(err);
        this.toastr.error('Please try again', 'Step 3 Unsuccessful!');
      });
  }

}
