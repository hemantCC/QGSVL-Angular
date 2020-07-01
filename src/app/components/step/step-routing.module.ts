import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DirectDebitComponent } from './direct-debit/direct-debit.component';
import { DocumentsComponent } from './documents/documents.component';
import { StepComponent } from './step.component';


const routes: Routes = [
  {
    path: '',
    component: StepComponent,
    children: [
      { 
        path: 'direct-debit',
        component: DirectDebitComponent 
      },
      { 
        path: 'documents',
        component: DocumentsComponent 
      }

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StepRoutingModule { }
