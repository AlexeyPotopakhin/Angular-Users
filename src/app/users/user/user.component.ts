import {Component, Input} from '@angular/core';
import {User} from './user.module';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.pug',
  styleUrls: ['./user.component.styl']
})
export class UserComponent {
  @Input() user: User;

  private STATUS_ARRAY = ['Подписка активна', 'Приостановлена', 'Заблокирован'];

  constructor() { }

  get avatar(): string {
    return `${environment.host}${this.user.avatar}`;
  }

  get name(): string {
    const name = this.user.name.charAt(0);
    const mname = this.user.mname.charAt(0);
    return `${this.user.fname} ${name}. ${mname}.`;
  }

  get status(): string {
    return this.STATUS_ARRAY[this.user.status];
  }
}
