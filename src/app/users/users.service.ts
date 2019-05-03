import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {interval, Observable, of, throwError} from 'rxjs';
import {User} from './user/user.module';
import {concatMap, flatMap} from 'rxjs/operators';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  /**
   * Loads users list
   *
   * @param status Status
   */
  loadUsers(status?: number): Observable<User[]> {
    let params = new HttpParams();
    if (status && _.isNumber(status))
      params = params.set('status', status.toString());

    const request = this.httpClient.get<User[]>('https://frontend-test.cloud.technokratos.com/users', {params}).pipe(
      concatMap(users => {
        if (_.isArray(users))
          return of(users);
        return throwError(users);
      })
    );

    return interval(5000).pipe(
      flatMap(() => request)
    );

    // return this.httpClient.get<User[]>('https://frontend-test.cloud.technokratos.com/users', {params}).pipe(
    //   concatMap(users => {
    //     if (_.isArray(users))
    //       return of(users);
    //     return throwError(users);
    //   })
    // );
  }
}
