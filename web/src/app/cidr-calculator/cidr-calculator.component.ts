import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CIDRNotation } from '../models/cidr-notation';
import { CIDRIpCalcService } from '../services/cidr-ip-calc.service';
import { HelperService } from '../services/helper.service';
import { ProcessingStatus } from '../shared/enums';

@Component({
  selector: 'app-cidr-calculator',
  templateUrl: './cidr-calculator.component.html',
  styleUrls: ['./cidr-calculator.component.scss']
})
export class CidrCalculatorComponent {
  ipAddressStart = '';
  ipAddressEnd = '';
  ProcessingStatusType = ProcessingStatus;
  cidrRangeProcessingStatus: ProcessingStatus = ProcessingStatus.None;
  cidrNotation: CIDRNotation | null = null;
  turnInputDisplayOn = false;
  ipInputError = '';
  isStartIPValidFlag = false;
  isEndingIPValidFlag = false;
  isInputValid = false;
  constructor(
    private cidrIPCalcService: CIDRIpCalcService,
    private helperService: HelperService
  ) {}

  isStartIPValid(e: [boolean, string]): void {
    this.turnInputDisplayOn = false;
    this.isStartIPValidFlag = e[0];
    this.ipInputError = e[1];
    this.isInputValid = this.isStartIPValidFlag && this.isEndingIPValidFlag;
  }

  isEndingIPValid(e: [boolean, string]): void {
    this.turnInputDisplayOn = false;
    this.isEndingIPValidFlag = e[0];
    this.ipInputError = e[1];
    this.isInputValid = this.isStartIPValidFlag && this.isEndingIPValidFlag;
  }

  getCIDRRange(): void {
    this.cidrRangeProcessingStatus = ProcessingStatus.Processing;
    this.turnInputDisplayOn = true;
    this.cidrIPCalcService
      .getCIDRNotation(this.ipAddressStart, this.ipAddressEnd)
      .subscribe(
        (result) => {
          this.cidrRangeProcessingStatus = ProcessingStatus.Completed;
          this.cidrNotation = result;
        },
        (error) => {
          this.cidrRangeProcessingStatus = ProcessingStatus.Error;
          const errorMessage = `${error.message}\n${
            error.error?.detail == null ? '' : error.error?.detail
          }`;
          this.helperService.setPopupMessage(errorMessage);
          console.log(errorMessage);
        }
      );
  }
}
