import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../user/user.model';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.css']
})
export class UserEditModalComponent {
  user: User;

  statusList = [
    {key: 0, name: 'Активен'},
    {key: 1, name: 'Приостановлен'},
    {key: 2, name: 'Заблокирован'}
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: {user: User}) {
    this.user = Object.assign({}, data.user);
  }

  get name() {
    return `${this.data.user.fname} ${this.data.user.name}`;
  }
}
