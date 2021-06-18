import {
  Component,
  Output,
  EventEmitter,
  forwardRef,
  Input
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-ip',
  templateUrl: './input-ip.component.html',
  styleUrls: ['./input-ip.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputIpComponent), // replace name as appropriate
      multi: true
    }
  ]
})
export class InputIpComponent implements ControlValueAccessor {
  @Input() label = '';
  private _value = '';
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    this._value = v;
    this.onChange(v);
  }
  @Output() isValid: EventEmitter<[boolean, string]> = new EventEmitter();

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange = (value: string) => {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: any = () => {};
  private specialKeysPressed = false;
  private keysToSkip = [
    'Backspace',
    'Delete',
    'Tab',
    'Control',
    'Meta',
    'ArrowLeft',
    'ArrowRight'
  ];
  private specialKeys = ['Control', 'Meta'];
  writeValue(obj: any): void {
    this._value = obj;
    this.onChange(this._value);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onIPKeyDown(e: KeyboardEvent): void {
    if (!e) {
      return;
    }
    if (this.specialKeysPressed) {
      if (['V', 'v', 'C', 'c'].includes(e.key)) {
        this.specialKeysPressed = false;
        return;
      }
    }
    if (this.keysToSkip.includes(e.key)) {
      if (this.specialKeys.includes(e.key)) {
        this.specialKeysPressed = true;
        return;
      }
      this.specialKeysPressed = false;
      return;
    }
    this.specialKeysPressed = false;
    const previousIPPart = this.getIPPreviousPart(e.target);
    const ipAddressParts = this.value.split('.');
    if (e.key === '.') {
      if (previousIPPart === '.' || previousIPPart === '') {
        this.invalidateKeyPress(e);
        return;
      } else if (ipAddressParts.length === 4) {
        e.stopPropagation();
        e.preventDefault();
        return;
      } else {
        return;
      }
    }
    if (Number.isNaN(parseInt(e.key, 10))) {
      this.invalidateKeyPress(e);
      return;
    }
    const newIPPart =
      previousIPPart === ''
        ? parseInt(e.key, 10)
        : parseInt(previousIPPart + e.key, 10);

    if (newIPPart > 255) {
      e.stopPropagation();
      e.preventDefault();
      const previousIPPartNum = parseInt(previousIPPart, 10);
      if (previousIPPartNum < 255) {
        this.isValid.emit([true, '']);
        return;
      }
      this.invalidateKeyPress(e);
      return;
    }
    this.isValid.emit([true, '']);
  }

  private getIPPreviousPart(e: any) {
    const cursorPosition = e?.selectionStart ?? null;
    let ipValue = this.value;
    if (cursorPosition != null) {
      ipValue = this.value.substr(0, cursorPosition);
    }
    if (ipValue && ipValue.length > 0) {
      const ipAddrParts = ipValue.split('.');
      if (ipAddrParts.length > 0) {
        return ipAddrParts[ipAddrParts.length - 1];
      }
    }
    return '';
  }

  verifyIPAddress(): void {
    if (!this.value) {
      this.isValid.emit([false, '']);
      return;
    }
    const ipAddressParts = this.value.split('.');
    if (ipAddressParts.length < 4) {
      this.isValid.emit([false, '']);
      return;
    }
    if (ipAddressParts.length > 4) {
      this.isValid.emit([false, 'Invalid IP Address']);
      return;
    }
    let errorMsg = '';
    let result = true;
    if (ipAddressParts.length === 4) {
      result = ipAddressParts.every((parts) => {
        if (parts === '') {
          this.isValid.emit([false, '']);
          return;
        }
        const keyNum = parseInt(parts, 10);
        if (keyNum > 255 || keyNum < 0) {
          errorMsg = 'IP Address cannot be more than 255';
          return false;
        }
        errorMsg = '';
        return true;
      });
    }
    this.isValid.emit([result, errorMsg]);
  }

  invalidateKeyPress(e: KeyboardEvent): void {
    e.stopPropagation();
    e.preventDefault();
    this.isValid.emit([false, '']);
  }
}
