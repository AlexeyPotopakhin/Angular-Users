import {Injectable, Injector} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {NotificationComponent} from './notification.component';
import {NotificationData} from './notification-data.module';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private positionStrategy = this.overlay.position()
    .global()
    .top('70px')
    .right('50px');

  constructor(private overlay: Overlay,
              private parentInjector: Injector) { }

  /**
   * Creates error message
   *
   * @param message Message
   */
  error(message: string) {
    this.notification({type: 'error', message, icon: 'error'});
  }

  /**
   * Creates notification
   *
   * @param data Notification data
   */
  notification(data: NotificationData) {
    const overlayRef = this.overlay.create({positionStrategy: this.positionStrategy});

    // Collecting component data
    const tokens = new WeakMap();
    tokens.set(NotificationData, data);
    tokens.set(OverlayRef, overlayRef);
    const injector = new PortalInjector(this.parentInjector, tokens);

    const toastPortal = new ComponentPortal(NotificationComponent, null, injector);
    overlayRef.attach(toastPortal);
  }
}
