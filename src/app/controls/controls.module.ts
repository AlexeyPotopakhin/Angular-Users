import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputComponent} from './input/input.component';
import {FormsModule} from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';

@NgModule({
  declarations: [InputComponent, DropdownComponent],
  exports: [InputComponent, DropdownComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ControlsModule { }
