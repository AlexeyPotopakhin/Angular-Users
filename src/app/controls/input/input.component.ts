import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';

@Component({
  selector: 'app-input',
  template: `
    <div class="app-input__container">
      <input [type]="type" [(ngModel)]="value" (blur)="onBlur()" [required]="required" [placeholder]="placeholder">
      <i class="material-icons" (click)="type = 'text'; isPasswordVisible = true" title="Показать пароль" *ngIf="isPassword && !isPasswordVisible">visibility</i>
      <i class="material-icons" (click)="type = 'password'; isPasswordVisible = false" title="Скрыть пароль" *ngIf="isPasswordVisible">visibility_off</i>
    </div>
  `,
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() type: string = 'text';
  @Input() required: boolean = false;

  isPasswordVisible = false;
  get isPassword() {
    return this.type == 'password';
  }

  private innerValue: any = '';

  constructor() { }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get value(): any {
    return this.innerValue;
  };

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  writeValue(obj: any): void {
    if (obj !== this.innerValue) {
      this.innerValue = obj;
    }
  }
}
