import { TestBed } from '@angular/core/testing';

import { CidrIpCalcService } from './cidr-ip-calc.service';

describe('CidrIpCalcService', () => {
  let service: CidrIpCalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CidrIpCalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
