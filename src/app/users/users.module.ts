import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {FiltersModule} from '../filters/filters.module';
import {UserComponent} from './user/user.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MomentModule} from 'ngx-moment';
import {UserEditModalComponent} from './user-edit-modal/user-edit-modal.component';

import {MatButtonModule, MatDialogModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ControlsModule} from '../controls/controls.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    UserEditModalComponent
  ],
  exports: [UsersComponent],
  entryComponents: [UserEditModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    FiltersModule,
    BrowserModule,
    BrowserAnimationsModule,
    MomentModule,
    MatDialogModule,
    MatButtonModule,
    ControlsModule
  ]
})
export class UsersModule { }
