import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { IpRangeCalculatorComponent } from './ip-range-calculator/ip-range-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    IpRangeCalculatorComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
