import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPRangeInformation } from '../models/ip-range-information';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidrIpCalcService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getIPRangeInformation(
    ipAddress: string,
    cidr: number
  ): Observable<IPRangeInformation> {
    const cidrRangeAPIPath = `/cidr/iprange/${ipAddress}/${cidr}`;
    const getIPRangeUrl = `${this.apiUrl}/${cidrRangeAPIPath}/`;
    return this.httpClient.get<IPRangeInformation>(getIPRangeUrl);
  }
}
