import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IpRangeCalculatorComponent } from './ip-range-calculator/ip-range-calculator.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CidrCalculatorComponent } from './cidr-calculator/cidr-calculator.component';
import { InputIpComponent } from './shared/component/input-ip/input-ip.component';

@NgModule({
  declarations: [AppComponent, IpRangeCalculatorComponent, CidrCalculatorComponent, InputIpComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
