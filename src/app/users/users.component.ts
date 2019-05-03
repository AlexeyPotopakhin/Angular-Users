import {Component, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {FilterItem} from '../filters/filter-item';
import {Observable} from 'rxjs';
import {User} from './user/user.module';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.pug',
  styleUrls: ['./users.component.styl'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {
  filters: FilterItem[] = [
    {
      id: '',
      name: 'Все'
    }, {
      id: '2',
      name: 'Заблокированные'
    }, {
      id: '0',
      name: 'Активные'
    }
  ];

  users$: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.usersService.loadUsers();
  }

  /**
   * Executes on filter change
   */
  onFilterChange(filter: FilterItem) {
    this.users$ = this.usersService.loadUsers(parseInt(filter.id));
  }

  trackUser(index: number, user: User) {
    return user ? user.id : null;
  }
}
