import { Component, OnInit, Input } from '@angular/core';
import { StepService } from 'src/app/services/step.service';
import { CreditCheckValues } from 'src/app/models/creditCheck';
import { PersonalDetail } from 'src/app/models/personalDetail';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-personal-contact-detail',
  templateUrl: './personal-contact-detail.component.html',
  styleUrls: ['./personal-contact-detail.component.css']
})
export class PersonalContactDetailComponent implements OnInit {

  @Input() allValues: CreditCheckValues
  personalDetail: PersonalDetail
  personalDetailForm: FormGroup;

  constructor(private stepService: StepService,
    private formBuilder: FormBuilder) {

    this.personalDetailForm = formBuilder.group({
      maritalStatus: ['',Validators.required],
      nationality: new FormControl(''),
      registrationNumber: ['',Validators.required],
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      addressLine3: new FormControl(''),
      city: new FormControl(''),
      postCode: new FormControl(''),
      livedSince: new FormControl(''),
    });
  }

  ngOnInit() {
    // this.onReload();
  }


  onSubmit() {
    localStorage.setItem('personalDetails', JSON.stringify(this.personalDetailForm.value));
    console.log(JSON.parse(localStorage.getItem('personalDetails')));
  }

  onReload() {
    if (localStorage.getItem('personalDetails') != null) {
      let populate: any = JSON.parse(localStorage.getItem('personalDetails'));
      this.personalDetailForm.patchValue({
        maritalStatus: populate.maritalStatus,
        nationality: populate.nationality,
        registrationNumber: populate.registrationNumber,
        addressLine1: populate.addressLine1,
        addressLine2: populate.addressLine2,
        addressLine3: populate.addressLine3,
        city: populate.city,
        postCode: populate.postCode,
        livedSince: populate.livedSince,
      });

    }
  }
}
