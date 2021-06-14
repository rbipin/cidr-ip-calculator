import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidrCalculatorComponent } from './cidr-calculator.component';

describe('CidrCalculatorComponent', () => {
  let component: CidrCalculatorComponent;
  let fixture: ComponentFixture<CidrCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidrCalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CidrCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
