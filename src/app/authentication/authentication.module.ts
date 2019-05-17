import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationComponent} from './authentication.component';
import {FormsModule} from '@angular/forms';
import {ControlsModule} from '../controls/controls.module';

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ControlsModule
  ]
})
export class AuthenticationModule { }
