import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputIpComponent } from './input-ip.component';

describe('InputIpComponent', () => {
  let component: InputIpComponent;
  let fixture: ComponentFixture<InputIpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputIpComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputIpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
