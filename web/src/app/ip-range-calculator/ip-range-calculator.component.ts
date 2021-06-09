import { Component } from '@angular/core';
import { IPRangeInformation } from '../models/ip-range-information';
import { CIDRIpCalcService } from '../services/cidr-ip-calc.service';

enum ProcessingStatus {
  None,
  Completed,
  Processing,
  Error
}

@Component({
  selector: 'app-ip-range-calculator',
  templateUrl: './ip-range-calculator.component.html',
  styleUrls: ['./ip-range-calculator.component.scss']
})
export class IpRangeCalculatorComponent {
  ProcessingStatusType = ProcessingStatus;
  ipAddress = '';
  cidrRange = '';
  ipRangeProcessingStatus: ProcessingStatus = ProcessingStatus.None;
  ipInputError = '';
  cidrInputError = '';
  ipRange: IPRangeInformation | null = null;
  private lastEnteredChar = '';
  private keysToSkip = ['Backspace', 'Delete', 'Tab'];
  isInputValid = false;
  errorToolTip = '';

  constructor(private cidrIPCalcService: CIDRIpCalcService) {}

  onInputChange(): void {
    const isIPAddressValid = this.verifyIPAddress();
    const cidrRangeValid = this.verifyCIDRRange();
    if (isIPAddressValid && cidrRangeValid) {
      this.isInputValid = true;
      return;
    }
    this.isInputValid = false;
  }

  private verifyIPAddress(): boolean {
    if (!this.ipAddress) {
      this.ipInputError = '';
      return false;
    }
    const ipAddressParts = this.ipAddress.split('.');
    if (ipAddressParts.length < 4) {
      return false;
    }
    if (ipAddressParts.length > 4) {
      this.ipInputError = 'Invalid IP Address';
      return false;
    }
    if (ipAddressParts.length === 4)
      return ipAddressParts.every((parts) => {
        if (parts === '') {
          return false;
        }
        const keyNum = parseInt(parts, 10);
        if (keyNum > 255 || keyNum < 0) {
          this.ipInputError = 'IP Address cannot be more than 255';
          return false;
        }
        this.ipInputError = '';
        return true;
      });
    return false;
  }

  private verifyCIDRRange(): boolean {
    if (!this.cidrRange) {
      this.cidrInputError = '';
      return false;
    }
    const cidrRangeNum = parseInt(this.cidrRange, 10);
    if (cidrRangeNum > 32) {
      this.cidrInputError = 'CIDR range exceeds 32';
      return false;
    }
    this.cidrInputError = '';
    return true;
  }

  getCidrRangeCalculation(): void {
    this.ipRangeProcessingStatus = ProcessingStatus.Processing;
    this.errorToolTip = '';
    const ipVerification = this.verifyIPAddress();
    const cidrRangeVerification = this.verifyCIDRRange();
    if (ipVerification && cidrRangeVerification) {
      const cidrRangeNum = parseInt(this.cidrRange, 10);
      this.cidrIPCalcService
        .getIPRangeInformation(this.ipAddress, cidrRangeNum)
        .subscribe(
          (result) => {
            this.ipRangeProcessingStatus = ProcessingStatus.Completed;
            this.ipRange = result;
          },
          (error) => {
            this.ipRangeProcessingStatus = ProcessingStatus.Error;
            this.errorToolTip = error.message;
            console.log(error);
          }
        );
    }
  }

  onCidrKeyDown(e: KeyboardEvent): void {
    if (!e) {
      return;
    }
    if (this.keysToSkip.includes(e.key)) {
      return;
    }
    if (Number.isNaN(parseInt(e.key, 10))) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  }

  private getIPPreviousChar() {
    if (this.ipAddress && this.ipAddress.length > 0) {
      this.lastEnteredChar = this.ipAddress[this.ipAddress.length - 1];
      return;
    }
    this.lastEnteredChar = '';
  }

  onIPKeyDown(e: KeyboardEvent): void {
    if (!e) {
      return;
    }
    this.getIPPreviousChar();
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
    if (Number.isNaN(parseInt(e.key, 10))) {
      return;
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
    this.lastEnteredChar = e.key;
  }
}
