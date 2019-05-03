import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {UsersComponent} from './users/users.component';
import {AuthenticationService} from './authentication/authentication.service';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [AuthenticationService]
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
