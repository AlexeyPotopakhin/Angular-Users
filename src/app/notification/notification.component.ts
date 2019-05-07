import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationData} from './notification-data.module';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {OverlayRef} from '@angular/cdk/overlay';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.pug',
  styleUrls: ['./notification.component.styl'],
  animations: [
    trigger('fadeAnimation', [
      state('default', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate('300ms')]),
      transition(
        'default => closing',
        animate('300ms', style({ opacity: 0 }))
      ),
    ])
  ]
})
export class NotificationComponent implements OnInit, OnDestroy {
  animationState: 'default' | 'closing' = 'default';
  iconBackgroundColor: string;

  private intervalId: number;

  constructor(readonly data: NotificationData,
              private readonly overlay: OverlayRef) {
    switch (data.type) {
      case 'info':
        this.iconBackgroundColor = '#0084F4';
        break;
      case 'error':
        this.iconBackgroundColor = '#FF647C';
        break;
      case 'warning':
        this.iconBackgroundColor = '#FFCF5C';
        break;
      case 'success':
        this.iconBackgroundColor = '#00C48C';
        break;
    }
  }

  ngOnInit() {
    this.intervalId = setTimeout(() => this.animationState = 'closing', this.data.closeTimeout || 2000);
  }

  /**
   * On animation complete
   */
  onFadeFinished() {
    const itFinished = this.animationState === 'closing';

    if (itFinished)
      this.overlay.dispose();
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }
}
