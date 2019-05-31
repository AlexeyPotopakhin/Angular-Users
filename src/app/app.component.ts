import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LoaderService} from "./loader/loader.service";
import {Subscription} from "rxjs";
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private routeEventSubscription: Subscription;

  constructor(private router: Router, private loaderService: LoaderService) {}

  ngOnInit(): void {
    // Moment js localization
    moment.locale('ru');

    // Subscribing on route navigation end event and hiding loader
    this.routeEventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loaderService.hide();
        this.routeEventSubscription.unsubscribe();
      }
    });
  }
}
