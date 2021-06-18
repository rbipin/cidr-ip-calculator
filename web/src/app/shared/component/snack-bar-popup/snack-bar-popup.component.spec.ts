import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackBarPopupComponent } from './snack-bar-popup.component';

describe('SnackBarPopupComponent', () => {
  let component: SnackBarPopupComponent;
  let fixture: ComponentFixture<SnackBarPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackBarPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
