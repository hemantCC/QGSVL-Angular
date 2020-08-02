import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StepModule } from './components/step/step.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedModule } from './components/shared/shared.module';
import { ViewQuotationComponent } from './components/vehicle-detail/view-quotation/view-quotation.component';
import { UserQuotesComponent } from './components/user-quotes/user-quotes.component';

@NgModule({
  declarations: [
    AppComponent,
    UserQuotesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StepModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates:true
    }),
    NgxSpinnerModule,
    SharedModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ViewQuotationComponent]
})
export class AppModule { }
