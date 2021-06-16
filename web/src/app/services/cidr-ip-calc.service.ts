import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPRangeInformation } from '../models/ip-range-information';
import { CIDRNotation } from '../models/cidr-notation';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { CIDRNotationRequest } from '../models/cidrNotationRequest';

@Injectable({
  providedIn: 'root'
})
export class CIDRIpCalcService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getIPRangeInformation(
    ipAddress: string,
    cidr: number
  ): Observable<IPRangeInformation> {
    const cidrRangeAPIPath = `cidr/iprange/${ipAddress}/${cidr}`;
    const getIPRangeUrl = `${this.apiUrl}/${cidrRangeAPIPath}`;
    return this.httpClient.get<IPRangeInformation>(getIPRangeUrl);
  }

  getCIDRNotation(
    startIPAddress: string,
    endIPAddress: string
  ): Observable<CIDRNotation> {
    const request: CIDRNotationRequest = {
      StartingIP: startIPAddress,
      EndingIP: endIPAddress
    };
    const cidrRangeAPIPath = `cidr/cidr-range`;
    const getCIDRRangeUrl = `${this.apiUrl}/${cidrRangeAPIPath}`;
    return this.httpClient.post<CIDRNotation>(getCIDRRangeUrl, request);
  }
}
