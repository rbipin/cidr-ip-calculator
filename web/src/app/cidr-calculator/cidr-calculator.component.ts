import { Component } from '@angular/core';

@Component({
  selector: 'app-cidr-calculator',
  templateUrl: './cidr-calculator.component.html',
  styleUrls: ['./cidr-calculator.component.scss']
})
export class CidrCalculatorComponent {
  ipAddressStart = '';
  ipAddressEnd = '';
}
