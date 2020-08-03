import { Component, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-e-sign',
  templateUrl: './e-sign.component.html',
  styleUrls: ['./e-sign.component.css']
})
export class ESignComponent implements OnInit {

  constructor(private stepper: MatStepper,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  onFinish(){
    this.stepper.selected.completed = true;
    localStorage.setItem('step5', 'completed');
    this.toastr.success('You have successfully placed order.','Order Successfull!');
    this.router.navigateByUrl('/Home');
  }

}
