import { Component, OnInit, Input } from '@angular/core';
import { CreditCheckValues, employmentDetails } from 'src/app/models/creditCheck';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-address-employment',
  templateUrl: './address-employment.component.html',
  styleUrls: ['./address-employment.component.css']
})
export class AddressEmploymentComponent implements OnInit {

  @Input() allValues: CreditCheckValues

  addressEmploymentForm: FormGroup;
  file: File = null;
  stringFile: string = null;

  constructor(private formBuilder: FormBuilder) {

    this.addressEmploymentForm = formBuilder.group({
      employmentStatus: new FormControl(''),
      employerName: new FormControl(''),
      contractType: new FormControl(''),
      startDate: new FormControl(''),
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      postCode: new FormControl(''),
      city: new FormControl(''),
      netIncome: new FormControl(''),
      rentalIncome: new FormControl(''),
      salarySlip: new FormControl(''),
      propertyStatus: new FormControl(''),
      creditCost: new FormControl(''),
      monthlyRent: new FormControl(''),
    });
  }

  ngOnInit() {
    this.onReload();
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(event.target.value);
    
    var reader = new FileReader();
    reader.onloadend = () => {
      // this.stringFile = reader.result.toString()
      // console.log(localStorage.getItem('file'));
      // localStorage.setItem('file',this.stringFile)
      let blob = new Blob([new Uint8Array(event.target.result)], { type: this.file.type });
      // reader.readAsText(blob)
      reader.readAsDataURL(blob);
      console.log(reader.result);
    }

  }

  onSubmit() {
    // this.addressEmploymentForm.patchValue({
    //   salarySlip: this.file
    // });

    localStorage.setItem('address-Employment', JSON.stringify(this.addressEmploymentForm.value))
    console.log(JSON.parse(localStorage.getItem('address-Employment')));
  }


  onReload() {
    if (localStorage.getItem('personalDetails') != null) {
      let populate: employmentDetails = JSON.parse(localStorage.getItem('address-Employment'));
      this.addressEmploymentForm.patchValue({
        addressLine1: populate.addressLine1,
        addressLine2: populate.addressLine2,
        city: populate.city,
        postCode: populate.postCode,
        contractType: populate.contractType,
        employerName: populate.employerName,
        employmentStatus: populate.employmentStatus,
        monthlyRent: populate.monthlyRent,
        netIncome: populate.netIncome,
        propertyStatus: populate.propertyStatus,
        rentalIncome: populate.rentalIncome,
        startDate: populate.startDate,
        creditCost: populate.creditCost,
      });

    }
  }

}
