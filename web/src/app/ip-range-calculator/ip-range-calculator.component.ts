import { Component } from '@angular/core';

@Component({
  selector: 'app-ip-range-calculator',
  templateUrl: './ip-range-calculator.component.html',
  styleUrls: ['./ip-range-calculator.component.scss']
})
export class IpRangeCalculatorComponent {
  ipAddress = '';
  cidrRange = '';
  isProcessing = true;
  ipInputError = '';
  cidrInputError = '';

  onCidrChange(): void {}
  onIPChange(): void{

  }

  private validateIP(){
    if (!this.ipAddress){
      
    }
  }
}
