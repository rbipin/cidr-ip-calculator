import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  private popup$: Subject<string> = new Subject();

  get popup(): Observable<string> {
    return this.popup$.asObservable();
  }
  setPopupMessage(value: string): void {
    this.popup$.next(value);
  }
}
