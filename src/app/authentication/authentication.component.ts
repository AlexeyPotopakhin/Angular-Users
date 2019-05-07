import {Component} from '@angular/core';
import {AuthenticationService} from './authentication.service';
import {catchError} from 'rxjs/operators';
import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import {NotificationService} from '../notification/notification.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.pug',
  styleUrls: ['./authentication.component.styl']
})
export class AuthenticationComponent {
  isPasswordVisible = false;

  auth = {
    login: null,
    password: null
  };

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private notificationService: NotificationService) { }

  login() {
    this.authenticationService.login(this.auth.login, this.auth.password).pipe(
      catchError((error: Error | HttpErrorResponse) => {
        if (error instanceof Error)
          console.error(error.message);
        else if (error instanceof HttpErrorResponse && error.status == 403)
          this.notificationService.error('Неверные логин или пароль');
        return throwError(error);
      })
    ).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
