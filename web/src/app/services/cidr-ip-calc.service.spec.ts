import { TestBed } from '@angular/core/testing';

import { CIDRIpCalcService } from './cidr-ip-calc.service';

describe('CidrIpCalcService', () => {
  let service: CIDRIpCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CIDRIpCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
