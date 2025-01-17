import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleDetailComponent } from './vehicle-detail.component';


const routes: Routes = [
  {
    path: '',
    component: VehicleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicleDetailRoutingModule { }
