import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IpRangeCalculatorComponent } from './ip-range-calculator.component';

describe('IpRangeCalculatorComponent', () => {
  let component: IpRangeCalculatorComponent;
  let fixture: ComponentFixture<IpRangeCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IpRangeCalculatorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IpRangeCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
