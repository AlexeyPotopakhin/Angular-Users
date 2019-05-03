import {Component, Input} from '@angular/core';
import {User} from './user.module';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.pug',
  styleUrls: ['./user.component.styl']
})
export class UserComponent {
  @Input() user: User;

  STATUS_ARRAY = ['Подписка активна', 'Приостановлена', 'Заблокирован'];

  constructor() { }

  get name() {
    const name = this.user.name.charAt(0);
    const mname = this.user.mname.charAt(0);
    return `${this.user.fname} ${name}. ${mname}.`;
  }
}
