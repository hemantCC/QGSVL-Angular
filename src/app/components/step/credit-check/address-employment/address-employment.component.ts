import { Component, OnInit, Input } from '@angular/core';
import { CreditCheckValues, employmentDetails } from 'src/app/models/creditCheck';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  formSaved: boolean = false;
  // formSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService) {

    this.addressEmploymentForm = formBuilder.group({
      employmentStatus: ['', Validators.required],
      employerName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(40)]],
      contractType: ['', Validators.required],
      startDate: ['', Validators.required],
      addressLine1: ['', Validators.required],
      addressLine2: new FormControl(''),
      postCode: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5), Validators.maxLength(7)]],
      city: ['', Validators.required],
      netIncome: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      rentalIncome: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      salarySlip: new FormControl(''),
      propertyStatus: ['', Validators.required],
      creditCost: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      monthlyRent: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  ngOnInit() {
    this.onReload();
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    console.log(this.file);

    // console.log(event.target.value);

    var reader = new FileReader();
    debugger
    reader.onload = () => {
      debugger
      // this.stringFile = reader.result.toString()
      // console.log(localStorage.getItem('file'));
      // localStorage.setItem('file',this.stringFile)
      let blob = new Blob([new Uint8Array(event.target.result)], { type: this.file.type });
      // reader.readAsText(blob)
      reader.readAsDataURL(blob);
      console.log(reader.result);
    }
  }

  onSave() {
    localStorage.setItem('address-Employment', JSON.stringify(this.addressEmploymentForm.value));
    this.formSaved = true;
    this.toastr.success('', 'Saved Successfully');
    console.log(JSON.parse(localStorage.getItem('address-Employment')));
  }

  //sets the saved values of form on reload
  onReload() {
    if (localStorage.getItem('address-Employment') != null) {
      let populate: employmentDetails = JSON.parse(localStorage.getItem('address-Employment'));
      this.addressEmploymentForm.patchValue({
        addressLine1: populate?.addressLine1,
        addressLine2: populate?.addressLine2,
        city: populate?.city,
        postCode: populate?.postCode,
        contractType: populate?.contractType,
        employerName: populate?.employerName,
        employmentStatus: populate?.employmentStatus,
        monthlyRent: populate?.monthlyRent,
        netIncome: populate?.netIncome,
        propertyStatus: populate?.propertyStatus,
        rentalIncome: populate?.rentalIncome,
        startDate: populate?.startDate,
        creditCost: populate?.creditCost,
      });
      this.formSaved = true;
    }

  }

}
