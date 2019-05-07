import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {merge, Observable, of, timer} from 'rxjs';
import {User} from './user/user.module';
import {catchError, concatMap, map, switchMap, timeout} from 'rxjs/operators';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';
import {NotificationService} from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,
              private notificationService: NotificationService) { }

  /**
   * Loads users list
   *
   * @param status Status
   */
  loadUsers(status?: number): Observable<User[]> {
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
        return of([]);
      })
    );

    // Basic auto request every 5s
    const autoRequest = timer(5000, 5000).pipe(
      switchMap(() => request)
    );

    return merge<User[], User[]>(
      requestWithTimeout,
      autoRequest
    );
  }
}
