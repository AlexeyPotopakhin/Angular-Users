import {Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from './users.service';
import {FilterItem} from '../filters/filter-item';
import {BehaviorSubject, Subscription} from 'rxjs';
import {User, UserStatus} from './user/user.model';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';
import {tap} from 'rxjs/operators';
import * as _ from 'lodash';

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
export class UsersComponent implements OnInit, OnDestroy {
  filters: FilterItem<UserStatus>[] = [
    {
      id: null,
      name: 'Все'
    }, {
      id: 2,
      name: 'Заблокированные'
    }, {
      id: 0,
      name: 'Активные'
    }
  ];

  users$ = new BehaviorSubject<User[]>(null);
  usersSubscription: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.usersSubscription = this.usersService.loadUsers().pipe(
      tap(users => this.users$.next(users))
    ).subscribe();
  }

  /**
   * Executes on filter change
   */
  onFilterChange(filter: FilterItem<UserStatus>) {
    this.usersSubscription.unsubscribe();

    this.usersSubscription = this.usersService.loadUsers(filter.id).pipe(
      tap(users => this.users$.next(users))
    ).subscribe();
  }

  /**
   * Invokes modal dialog to edit user
   *
   * @param user User
   */
  editUser(user: User) {
    this.usersService.editUser(user).pipe(tap(user => {
      const users = this.users$.getValue();
      const userToUpdate = _.find(users, ['id', user.id]);
      if (userToUpdate) {
        userToUpdate.name = user.name;
        userToUpdate.fname = user.fname;
        userToUpdate.mname = user.mname;
        userToUpdate.status = user.status;
      }
    })).subscribe();
  }

  trackUser(index: number, user: User) {
    return user ? user.id : null;
  }

  ngOnDestroy() {
    if (this.usersSubscription)
      this.usersSubscription.unsubscribe();
  }
}
