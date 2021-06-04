import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IpRangeCalculatorComponent } from './ip-range-calculator/ip-range-calculator.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, IpRangeCalculatorComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}