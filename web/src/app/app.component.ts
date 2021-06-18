import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { HelperService } from './services/helper.service';
import { SubSink } from 'subsink';
import { SnackBarPopupComponent } from './shared/component/snack-bar-popup/snack-bar-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'CIDR Calculator';
  private subs: SubSink = new SubSink();
  constructor(
    private snackBar: MatSnackBar,
    private helperService: HelperService
  ) {
    this.listenForOpenSnackBarPopup();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  listenForOpenSnackBarPopup(): void {
    this.subs.sink = this.helperService.popup.subscribe((message) => {
      this.snackBar.openFromComponent(SnackBarPopupComponent, {
        data: message,
        duration: 8000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }
}
