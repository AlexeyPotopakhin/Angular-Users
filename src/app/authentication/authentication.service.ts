import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {concatMap, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements CanActivate {
  private static AUTHENTICATION_TOKEN = 'AUTHENTICATION_TOKEN';

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  /**
   * Authenticates user
   */
  login(login: string, password: string) {
    return this.httpClient.post('https://frontend-test.cloud.technokratos.com/auth', JSON.stringify({login, password}),
      {headers: {'Content-Type': 'application/json'}, observe: 'response'}).pipe(
        // Checking for the auth token
        concatMap((response: HttpResponse<any>) => {
          const token = response.headers.get('authorization');
          if (!token)
            return throwError(new Error('Ошибка авторизации'));

          return of(token);
        }),
        // Saving to the local storage
        tap(tokenKey => AuthenticationService.saveAuthenticationToken(tokenKey))
    );
  }

  /**
   * Log out current user
   */
  logout() {
    localStorage.removeItem(AuthenticationService.AUTHENTICATION_TOKEN);
    return this.router.navigate(['/auth']);
  }

  /**
   * Loads user authentication token from the local storage
   */
  public static getAuthenticationToken(): string {
    return localStorage.getItem(AuthenticationService.AUTHENTICATION_TOKEN);
  }

  /**
   * Saves user token to the local storage
   */
  private static saveAuthenticationToken(token: string) {
    localStorage.setItem(AuthenticationService.AUTHENTICATION_TOKEN, token);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (AuthenticationService.getAuthenticationToken())
      return true;

    this.router.navigate(['/auth']);
    return false;
  }
}
