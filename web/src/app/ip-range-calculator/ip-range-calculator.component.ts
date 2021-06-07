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
  private lastEnteredChar = '';
  private keysToSkip = ['Backspace', 'Delete'];

  onCidrKeyDown(e: KeyboardEvent): void {
    if (!Number.isNaN(parseInt(e.key, 10))) {
      e.stopImmediatePropagation();
    }
  }

  onIPAddressChange(): void {
    if (!this.ipAddress) {
      this.ipInputError = '';
    }
    const ipAddressParts = this.ipAddress.split('.');
    ipAddressParts.forEach((parts) => {
      const keyNum = parseInt(parts, 10);
      if (keyNum > 255 || keyNum < 0) {
        this.ipInputError = 'IP Address cannot be more than 255 or 0';
      }
    });
  }

  onCidrChange(): void {}

  onIPKeyDown(e: KeyboardEvent): void {
    if (this.keysToSkip.includes(e.key)) {
      return;
    }
    if (e.key !== '.' && Number.isNaN(parseInt(e.key, 10))) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    if (e.key === '.') {
      if (this.lastEnteredChar === '.' || this.lastEnteredChar === '') {
        e.stopPropagation();
        e.preventDefault();
        return;
      }
    }
    const key: number = parseInt(e.key, 10);
    const ipAddressParts = this.ipAddress.split('.');
    if (ipAddressParts.length === 4 && ipAddressParts[3] !== '') {
      const lastPartLen = ipAddressParts[3].length;
      if (lastPartLen === 2) {
        const addressNum = parseInt(ipAddressParts[3] + e.key, 10);
        if (addressNum > 255) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
      }
    }
    switch (this.lastEnteredChar) {
      case '.':
      case '':
        if (key > 2) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        break;
      case '1':
      case '2':
        if (key > 5) {
          e.stopPropagation();
          e.preventDefault();
          return;
        }
        break;
    }
    this.lastEnteredChar = e.key;
  }
}
