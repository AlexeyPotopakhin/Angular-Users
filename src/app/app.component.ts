import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.styl'],
  animations: [
    trigger('loader', [
      transition(':leave', [
        animate(400, style({opacity: '0'}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  navigationEnd$: Observable<boolean>;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.navigationEnd$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        return true;
      })
    );
  }
}
