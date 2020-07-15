import { Component, OnInit } from '@angular/core';
import { StepService } from 'src/app/services/step.service';
import { ToastrService } from 'ngx-toastr';
import { DirectDebit } from 'src/app/models/directDebit';

@Component({
  selector: 'app-direct-debit',
  templateUrl: './direct-debit.component.html',
  styleUrls: ['./direct-debit.component.css']
})
export class DirectDebitComponent implements OnInit {

  debit: DirectDebit = new DirectDebit('');
  iban: DirectDebit = new DirectDebit('');

  constructor(private stepService: StepService,
    private toastr: ToastrService) { }

  ngOnInit() {
    
    if (JSON.parse(localStorage.getItem('iban')) != null) {
      this.iban = JSON.parse(localStorage.getItem('iban'));
      this.debit.ibanNumber = this.iban.ibanNumber;
    }
  }

  onSave() {
    this.stepService.directDebit(this.debit).subscribe(
      (res: any) => {
        localStorage.setItem('iban', JSON.stringify(this.debit));
        this.toastr.success('', 'Saved Sucessfully');
      },
      err => {
        console.log(err);
        this.toastr.error('Please try again', 'Save Unsuccessful!');
      });
  }


}
