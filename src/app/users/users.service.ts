import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {merge, Observable, of, timer} from 'rxjs';
import {User, UserStatus} from './user/user.model';
import {catchError, concatAll, concatMap, filter, map, switchMap, tap, timeout} from 'rxjs/operators';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';
import {NotificationService} from '../notification/notification.service';
import {MatDialog} from '@angular/material';
import {UserEditModalComponent} from './user-edit-modal/user-edit-modal.component';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService,
              private dialog: MatDialog) { }

  /**
   * Loads users list
   *
   * @param status Status
   */
  loadUsers(status?: UserStatus): Observable<User[]> {
    let params = new HttpParams();
    if (!_.isNaN(status) && _.isNumber(status))
      params = params.set('status', status.toString());

    // Basic request
    const request = this.httpClient.get<User[]>(`${environment.host}/users`, {params}).pipe(
      concatMap(users => {
        if (_.isArray(users))
          return of(users).pipe(
            map(users => _.sortBy(users, ['fname', 'name', 'mname']))
          );
        return request;
      })
    );

    // Basic request with timeout
    const requestWithTimeout = request.pipe(
      timeout(5000),
      catchError(() => {
        this.notificationService.error('Сервер не отвечает');
        return of(null);
      })
    );

    // Basic auto request every 5s
    const autoRequest = timer(5000, 5000).pipe(
      switchMap(() => request)
    );

    return merge(
      of(requestWithTimeout),
      of(autoRequest)
    ).pipe(concatAll());
  }

  /**
   * Invokes modal dialog to edit user
   *
   * @param user User
   */
  editUser(user: User): Observable<User> {
    return this.dialog.open(UserEditModalComponent, {
      autoFocus: false,
      width: '916px',
      data: {user}
    }).afterClosed().pipe(
      filter(user => user != null),
      tap(user => {
        this.saveUser(user).subscribe();
      })
    );
  }

  /**
   * Saves user
   *
   * @param user User
   */
  saveUser(user: User) {
    return this.httpClient.patch(`${environment.host}/users/${user.id}`, {
      name: user.name,
      fname: user.fname,
      mname: user.mname,
      status: user.status
    });
  }
}
