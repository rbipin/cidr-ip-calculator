import { Component } from '@angular/core';
import { IPRangeInformation } from '../models/ip-range-information';
import { CIDRIpCalcService } from '../services/cidr-ip-calc.service';
import { HelperService } from '../services/helper.service';
import { ProcessingStatus } from '../shared/enums';

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
  turnInputDisplayOn = false;
  ipRange: IPRangeInformation | null = null;
  isIPAddressValid = false;
  isCidrRangeValid = false;
  private specialKeysPressed = false;
  private keysToSkip = ['Backspace', 'Delete', 'Tab', 'Control', 'Meta'];
  private specialKeys = ['Control', 'Meta'];
  isInputValid = this.isIPAddressValid && this.isCidrRangeValid;

  constructor(
    private cidrIPCalcService: CIDRIpCalcService,
    private helperService: HelperService
  ) {}

  onInputChange(): void {
    this.turnInputDisplayOn = false;
    this.ipRangeProcessingStatus = ProcessingStatus.None;
    this.isCidrRangeValid = this.verifyCIDRRange();
    this.isInputValid = this.isIPAddressValid && this.isCidrRangeValid;
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

  isIPValid(e: [boolean, string]): void {
    this.turnInputDisplayOn = false;
    this.isIPAddressValid = e[0];
    this.ipInputError = e[1];
    this.isCidrRangeValid = this.verifyCIDRRange();
    this.isInputValid = this.isIPAddressValid && this.isCidrRangeValid;
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
    this.turnInputDisplayOn = true;
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
          const errorMessage = `${error.message}\n${
            error.error?.detail == null ? '' : error.error?.detail
          }`;
          this.helperService.setPopupMessage(errorMessage);
          console.log(errorMessage);
        }
      );
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

  private getIPPreviousPart() {
    if (this.ipAddress && this.ipAddress.length > 0) {
      const ipAddrParts = this.ipAddress.split('.');
      if (ipAddrParts.length > 0) {
        return ipAddrParts[ipAddrParts.length - 1];
      }
    }
    return '';
  }

  onIPKeyDown(e: KeyboardEvent): void {
    if (!e) {
      return;
    }
    if (this.specialKeysPressed) {
      if (['V', 'v', 'C', 'c'].includes(e.key)) {
        this.specialKeysPressed = false;
        return;
      }
    }
    if (this.keysToSkip.includes(e.key)) {
      if (this.specialKeys.includes(e.key)) {
        this.specialKeysPressed = true;
        return;
      }
      this.specialKeysPressed = false;
      return;
    }
    this.specialKeysPressed = false;
    const previousIPPart = this.getIPPreviousPart();
    const ipAddressParts = this.ipAddress.split('.');
    if (e.key === '.') {
      if (
        previousIPPart === '.' ||
        previousIPPart === '' ||
        ipAddressParts.length === 4
      ) {
        this.invalidateKeyPress(e);
        return;
      } else {
        return;
      }
    }
    if (Number.isNaN(parseInt(e.key, 10))) {
      this.invalidateKeyPress(e);
      return;
    }
    const newIPPart =
      previousIPPart === ''
        ? parseInt(e.key, 10)
        : parseInt(previousIPPart + e.key, 10);

    if (newIPPart > 255) {
      this.invalidateKeyPress(e);
      return;
    }
    this.isIPAddressValid = true;
  }

  invalidateKeyPress(e: KeyboardEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.isIPAddressValid = false;
  }
}
