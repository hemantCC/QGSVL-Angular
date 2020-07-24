import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { StepService } from 'src/app/services/step.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  // documentForm: FormGroup;
  drivingLicense: File
  certificateOfResidence: File
  identificationProof: File

  constructor(private stepper: MatStepper,
    private stepService: StepService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {
    // this.documentForm = formBuilder.group({
    //   drivingLicense: ['', []],
    //   certificateOfResidence: ['', []],
    //   identificationProof: ['', []]
    // });
  }

  ngOnInit() {
  }

  onChangeDrivingLicense(file: FileList) {
    this.drivingLicense = file.item(0);
  }

  onChangeCOR(file: FileList) {
    this.certificateOfResidence = file.item(0);
  }

  onChangeIdProof(file: FileList) {
    this.identificationProof = file.item(0);
  }

  onContinue() {
    this.spinner.show();
    this.stepService.postDocuments(this.drivingLicense, this.certificateOfResidence, this.identificationProof)
    .subscribe(
      (res) =>{
        this.spinner.hide();
        this.stepper.selected.completed = true;
        localStorage.setItem('step4', 'completed');
        this.toastr.success('', 'Step 4 Complete!');
        this.stepper.next();
      },
      err => {
        this.spinner.hide();
        console.log(err);
        this.toastr.error('Please try again', 'Step 4 Unsuccessful!');
      }
    );
  }


}
