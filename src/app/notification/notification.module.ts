import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NotificationComponent} from './notification.component';
import {OverlayModule} from '@angular/cdk/overlay';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [NotificationComponent]
})
export class NotificationModule { }
