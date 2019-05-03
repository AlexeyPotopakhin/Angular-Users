import {Component, Input, OnInit} from '@angular/core';
import {User} from './user.module';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.pug',
  styleUrls: ['./user.component.styl']
})
export class UserComponent implements OnInit {
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }
}
