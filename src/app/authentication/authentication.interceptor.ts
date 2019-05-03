import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Passing current authentication token to the request header
    const token = AuthenticationService.getAuthenticationToken();
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(req).pipe(catchError(err => {
      if (err.status == 403)
        this.router.navigate(['/auth']);

      return throwError(err);
    }));
  }
}
