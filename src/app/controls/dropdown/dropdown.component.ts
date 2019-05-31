import {Component, ElementRef, forwardRef, HostListener, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {noop} from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-dropdown',
  template: `
    <div class="app-input__container" (click)="isDropdownOpen = !isDropdownOpen">
      <input [ngModel]="name" (blur)="onBlur()" [required]="required" [placeholder]="placeholder" readonly>
      <i class="material-icons">arrow_drop_down</i>
    </div>
    <div class="app-dropdown__options" *ngIf="isDropdownOpen">
      <div class="app-dropdown__scroll-host">
        <div class="app-dropdown__option" [ngClass]="{'app-dropdown__option-active': option.key == key}" (click)="selectOption(option)"
             *ngFor="let option of values">{{option.name}}</div>
      </div>
    </div>
  `,
  styleUrls: ['../input/input.component.css', './dropdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
  @Input() placeholder: string;
  @Input() required: boolean = false;
  @Input() values: {key: any; name: string}[];

  isDropdownOpen: boolean = false;

  private innerKey: any;

  constructor(private _elementRef: ElementRef) { }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  get name(): any {
    if (_.isNil(this.key))
      return;
    return _.find(this.values, ['key', this.key]).name;
  }

  get key(): any {
    return this.innerKey;
  };

  set key(v: any) {
    if (v !== this.innerKey) {
      this.innerKey = v;
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
    if (obj !== this.innerKey) {
      this.innerKey = obj;
    }
  }

  selectOption(option: {key: string; name: string}) {
    this.isDropdownOpen = false;
    this.key = option.key;
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onOutsideClick(event: MouseEvent, targetElement: HTMLElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    if (!clickedInside)
      this.isDropdownOpen = false;
  }
}
