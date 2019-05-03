import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthenticationComponent} from './authentication/authentication.component';
import {UsersComponent} from './users/users.component';
import {AuthenticationService} from './authentication/authentication.service';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthenticationService]
  }, {
    path: 'auth',
    component: AuthenticationComponent
  }, {
    path: '**',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
