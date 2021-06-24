import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private apiKey: string = environment.apiKey ?? '';
  constructor(private httpClient: HttpClient) {}

  getIPRangeInformation(
    ipAddress: string,
    cidr: number
  ): Observable<IPRangeInformation> {
    const httpHeaders = new HttpHeaders().set('x-token', this.apiKey);
    const cidrRangeAPIPath = `cidr/iprange/${ipAddress}/${cidr}`;
    const getIPRangeUrl = `${this.apiUrl}/${cidrRangeAPIPath}`;
    return this.httpClient.get<IPRangeInformation>(getIPRangeUrl, {
      headers: httpHeaders
    });
  }

  getCIDRNotation(
    startIPAddress: string,
    endIPAddress: string
  ): Observable<CIDRNotation> {
    const request: CIDRNotationRequest = {
      StartingIP: startIPAddress,
      EndingIP: endIPAddress
    };
    const httpHeaders = new HttpHeaders().set('x-token', this.apiKey);
    const cidrRangeAPIPath = `cidr/cidr-range`;
    const getCIDRRangeUrl = `${this.apiUrl}/${cidrRangeAPIPath}`;
    return this.httpClient.post<CIDRNotation>(getCIDRRangeUrl, request, {
      headers: httpHeaders
    });
  }
}
