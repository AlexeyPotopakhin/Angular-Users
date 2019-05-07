/**
 * Notification data settings
 */
export class NotificationData {
  type: NotificationType;
  message: string;
  icon: string;
  closeTimeout?: number;
}

export type NotificationType = 'warning' | 'info' | 'success' | 'error';
