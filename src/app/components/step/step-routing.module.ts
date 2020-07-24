import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectDebitComponent } from './direct-debit/direct-debit.component';
import { DocumentsComponent } from './documents/documents.component';
import { StepComponent } from './step.component';
import { ESignComponent } from './e-sign/e-sign.component';
import { CreditCheckComponent } from './credit-check/credit-check.component';
import { EndOfCreditCheckComponent } from './end-of-credit-check/end-of-credit-check.component';


const routes: Routes = [
  {
    path: '',
    component: StepComponent,
    // children: [
    //   { 
    //     path: 'credit-check',
    //     component: CreditCheckComponent 
    //   },
    //   { 
    //     path: 'EndOfCreditCheck',
    //     component: EndOfCreditCheckComponent 
    //   },
    //   { 
    //     path: 'direct-debit',
    //     component: DirectDebitComponent 
    //   },
    //   { 
    //     path: 'documents',
    //     component: DocumentsComponent 
    //   },
    //   { 
    //     path: 'e-sign',
    //     component: ESignComponent 
    //   }

    // ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepRoutingModule { }
