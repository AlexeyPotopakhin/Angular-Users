import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersComponent} from './users.component';
import {FiltersModule} from '../filters/filters.module';
import {UserComponent} from './user/user.component';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MomentModule} from 'ngx-moment';

@NgModule({
  declarations: [UsersComponent, UserComponent],
  exports: [UsersComponent],
  imports: [
    CommonModule,
    FiltersModule,
    BrowserModule,
    BrowserAnimationsModule,
    MomentModule
  ]
})
export class UsersModule { }
