import { Component, OnInit, Input } from '@angular/core';
import { StepService } from 'src/app/services/step.service';
import { CreditCheckValues } from 'src/app/models/creditCheck';
import { PersonalDetail } from 'src/app/models/personalDetail';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-contact-detail',
  templateUrl: './personal-contact-detail.component.html',
  styleUrls: ['./personal-contact-detail.component.css']
})
export class PersonalContactDetailComponent implements OnInit {

  @Input() allValues: CreditCheckValues
  personalDetail: PersonalDetail
  personalDetailForm: FormGroup;
  formSaved: boolean = false;

  constructor(private stepService: StepService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) {

    this.personalDetailForm = formBuilder.group({
      maritalStatus: ['',Validators.required],
      nationality: ['',Validators.required],
      registrationNumber: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.maxLength(13)]],
      addressLine1: ['',Validators.required],
      addressLine2: new FormControl(''),
      addressLine3: new FormControl(''),
      city: ['',Validators.required],
      postCode: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(5),Validators.maxLength(7)]],
      livedSince: ['',Validators.required],
    });
  }

  ngOnInit() {
    this.onReload();
  }


  onSave() {
    localStorage.setItem('personalDetails', JSON.stringify(this.personalDetailForm.value));
    this.formSaved = true;
    this.toastr.success('','Saved Successfully');
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
      this.formSaved = true;
    }
  }
}
