import { Component, Inject } from '@angular/core';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-popup',
  templateUrl: './snack-bar-popup.component.html',
  styleUrls: ['./snack-bar-popup.component.scss']
})
export class SnackBarPopupComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarPopupComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public message: string
  ) {}
}
