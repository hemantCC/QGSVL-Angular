import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { StepService } from 'src/app/services/step.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

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
  formSaved: boolean = false;
  documentSubscription: Subscription

  constructor(private stepper: MatStepper,
    private stepService: StepService,
    private toastr: ToastrService) {
  }

  ngOnInit() {
    this.onReload();
  }

  onReload(){
    if(localStorage.getItem('step4')!= null){
      this.formSaved = true;
    }
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
    this.documentSubscription = this.stepService.postDocuments(this.drivingLicense, this.certificateOfResidence, this.identificationProof)
    .subscribe(
      () =>{
        this.stepper.selected.completed = true;
        this.formSaved = true;
        localStorage.setItem('step4', 'completed');
        this.toastr.success('', 'Step 4 Complete!');
        this.stepper.next();
      },
      err => {
        console.log(err);
        this.toastr.error('Please try again', 'Step 4 Unsuccessful!');
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.documentSubscription.unsubscribe();
  }


}
